var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var index = require('./routes/index');
var register = require('./routes/register');
var users = require('./routes/users');

var userStorage = 
[{

  name: "name",
  username: "user",
  password: "pass",
  type: "student"

}];


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

app.use(session({
  secret: "fuggettuhhbouudett",
  saveUninitialized: true,
  resave: true,
  name: "",
  username: "",
  password: "",
  type: ""
}));
 
//connection.connect();


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
app.use('/register',register);



app.post('/', function(req, res, next) 
{
  //res.sendFile("../views/index.ejs");
  //res.render('index', { title: 'College Life' });
  
  var queryString = 'SELECT * FROM user';
 
  connection.query(queryString, function(err, rows, fields) 
  {
      if (err) throw err;
   
      for(var i in rows)
      {
      	if (rows[i].User_ID == req.body.username)
        { 
      		break; 
      	}

      }
      if (rows[i].User_ID == req.body.username && rows[i].password == req.body.password)
      {
  		  console.log( rows[i].password);
      }
  		
      
      
  });

var currUser = 
            {
              username: req.body.username,
              password: req.body.password
            };

  if(verifyUser(currUser) == 1)
  {
    req.session.username = req.body.username;
    req.session.password = req.body.password;

    console.log("User: " + currUser.username + " logged in");

    res.redirect("users");
  }
  else
  {
    console.log("***** Username and/or Password not found *****");
    res.redirect("/");
  }

  
  
});

app.post('/register', function(req, res, next) 
{
  //res.sendFile("../views/index.ejs");
  //res.render('index', { title: 'College Life' });
  var newUser = 
            {
              name: req.body.name,
              username: req.body.username,
              password: req.body.password,
              type: req.body.type
            };
  

  if(userExists(newUser) == 0)
  {
    req.session.name = req.body.name;
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    req.session.type = req.body.type;

    userStorage.push(newUser);
    console.log("New user added");
    console.log(userStorage);

    res.redirect("users");
  }
  else
  {
    console.log("***** User " + newUser.username + " already exists *****");    
    res.redirect("register");
  }
    

  
  console.log(req.body.name); 
  console.log(req.body.username);
  console.log(req.body.password);
  console.log(req.body.type);
  var queryString = 'SELECT * FROM user';
 
  connection.query(queryString, function(err, rows, fields) 
  {
      if (err) throw err;
   
      for(var i in rows)
      {
        if (rows[i].User_ID == req.body.username)
        { 
          break; 
        }

      }
      if (rows[i].User_ID == req.body.username && rows[i].password == req.body.password)
      {
        console.log( rows[i].password);
      }
      
      
      
  });
  
  
});

function userExists(newUser)
{
  for(var i = 0; i < userStorage.length; i++)
  {
    if(newUser.username == userStorage[i].username)
    {      
      return 1;   
    }  
  }

  return 0;
}

function verifyUser(newUser)
{
  for(var i = 0; i < userStorage.length; i++)
  {
    if((newUser.username == userStorage[i].username) && (newUser.password == userStorage[i].password))
    {      
      return 1;   
    }  
  }

  return 0;
}


module.exports = app;
