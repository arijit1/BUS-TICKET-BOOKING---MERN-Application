
var express = require('express');
var path = require('path');
var loginRouter = require('./routes/requestAuthentication');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/requestAuthentication", loginRouter);

//connect DB
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, {}, (err, _DB) => {
  if (err) throw err;
  app.locals.db = _DB.db("BUSappData");
  console.log("connected");
})
app.use((req, res, next) => {
  //console.log(req.app.locals);
  next();
});

module.exports = app;
