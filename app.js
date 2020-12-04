const express = require('express');

var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
var config = require('./config/config');

var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var passport = require('passport');
var authenticate = require('./authenticate');

var FileStore = require('session-file-store')(session);

const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = config.mongoUrl;

const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connecté au serveur");
}, (err) => {console.log(err);});

var app = express();

app.all('*', (req, res, next) => {
  if(req.secure) {
    return next();
  }
  else {
    res.redirect(307, 'https://'+req.hostname+':'+app.get('secPort')+req.url);
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);        

app.use('/users', usersRouter);
app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);

module.exports = app;
