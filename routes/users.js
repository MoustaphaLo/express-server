var express = require('express');
var routerUser = express.Router();
var passport = require('passport');

const bodyParser = require('body-parser');
var User = require('../models/user');
var authenticate = require('../authenticate');

const cors = require('./cors');

routerUser.use(bodyParser.json());

routerUser.route('/signup')
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    User.register(new User({ username: req.body.username }),
      req.body.password, (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({ err: err });
        }
        else {
          if (req.body.firstname)
            user.firstname = req.body.firstname;
          if (req.body.lastname)
            user.lastname = req.body.lastname;
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.json({ err: err });
              return;
            }
            passport.authenticate('local')(req, res, () => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({ success: true, status: 'Registration Successful!' });
            });
          });
        }
      });
  });

routerUser.route('/login')
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(passport.authenticate('local'), (req, res) => {

    var token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token: token, status: 'You are successfully logged in!' });
  });

routerUser.route('/')
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    User.find({}, function (err, users) {
      var userMap = {};

      users.forEach(function (user) {
        userMap[user._id] = user;
      });
      res.send(userMap);
    });
  });

module.exports = routerUser;
