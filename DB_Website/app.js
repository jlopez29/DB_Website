var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var users = require('./routes/users');


var mysql = require('mysql');
var connection = require("express-myconnection");

var app = express();

var mysql = require('mysql');
 
var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'mydb',
    }
);
 
connection.connect();


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
  
var queryString = 'SELECT * FROM user';
 
connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
 
    for(var i in rows){
    	if (rows[i].User_ID == req.body.username){ 
    		break; 
    	}

    }
    if (rows[i].User_ID == req.body.username && rows[i].password == req.body.password){
		console.log( rows[i].password);
    }
		
    
    
});

  
  
});



module.exports = app;
