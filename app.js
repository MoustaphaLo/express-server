const express = require('express');

var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = "mongodb://localhost:27017/server-express";

const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connecté au serveur");
}, (err) => {console.log(err);});

var app = express();

app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);

module.exports = app;
