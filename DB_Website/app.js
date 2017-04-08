var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mysql = require('mysql');
var connection = require("express-myconnection");

var index = require('./routes/index');
var register = require('./routes/register');
var events = require('./routes/events');
var orgs = require('./routes/orgs');
var universities = require('./routes/universities');

var userStorage = 
[{

  name: "name",
  username: "user",
  password: "pass",
  type: "student"

}];

var app = express();
 
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
  type: "",
  eventName: "",
  eventDesc: "",
  eventTime: "",
  eventDate: "",
  eventLocation: "",
  contactPhone: "",
  contactEmail: " "
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
app.use('/register',register);
app.use('/events',events);
app.use('/orgs',orgs);
app.use('/universities',universities);


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

    res.redirect("events");
  }
  else
  {
    console.log("***** Username and/or Password not found *****");
    res.redirect("/");
  }

  
  
});

app.post('/events', function(req, res, next) 
{
  console.log(req.body);
  req.session.eventName = req.body.name;
  req.session.eventDesc = req.body.description;
  req.session.eventTime = req.body.time;
  req.session.eventDate = req.body.date;
  req.session.eventLocation = req.body.location;
  req.session.eventPhone = req.body.number;
  req.session.eventEmail = req.body.email;
  res.redirect('/events');
});

app.post('/orgs', function(req, res, next) 
{
  console.log(req.body);
  res.redirect('/orgs');
});

app.post('/universities', function(req, res, next) 
{
  console.log(req.body);
  res.redirect('/universities');
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

    res.redirect("events");
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
