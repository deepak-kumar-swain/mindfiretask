const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require("passport");
const db = require('./connection/db');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(db.database, {
  useNewUrlParser: true
});
mongoose.connection.on('connected', function(){
  console.log('Connected To Database');
});
mongoose.connection.error('error', function(err){
  console.log('Failed To Connect To Database: '+err);
});

const users = require('./route/user');
const products = require('./route/product');

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./connection/passport-user')(passport);

app.use('/user', users);
app.use('/product', products);

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  res.send("Invalid END-Point");
});
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, function () {
  console.log(`Mindfire Task By Deepak Started on PORT: ${PORT}`);
});
