var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var index = require('./routes/index');
var users = require('./routes/users');


var mysql = require('mysql');
var connection = require("express-myconnection");

var app = express();

app.use(connection(mysql, {
	host: "localhost",
	user: "root",
	password: "",
	database: "mydb"
},'request'));

app.use(session({
	secret: "fuggettuhhbouudett",
	saveUninitialized: true,
	resave: true,
	username: "",
	password: ""
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


app.post('/', function(req, res, next) {

  //res.sendFile("../views/index.ejs");
  //res.render('index', { title: 'College Life' });
  console.log(req.body.username);
  console.log(req.body.password);

  req.session.username = req.body.username;
  req.session.password = req.body.password;

  res.redirect("users");
});

module.exports = app;
