var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var index = require('./routes/index');
var register = require('./routes/register');
var events = require('./routes/events');
var orgs = require('./routes/orgs');
var universities = require('./routes/universities');


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
  
  var queryString = "SELECT * FROM user WHERE User_ID='"+req.body.username+"'";
  var currUser = {
    username: req.body.username,
    password: req.body.password
  };

  connection.query(queryString, function(err, rows, fields) 
  {
      if (err) throw err;
   
      if (rows[0].User_ID == currUser.username && rows[0].password == currUser.password)
      {
  		  req.session.username = req.body.username;
        req.session.password = req.body.password;

        console.log("User: " + currUser.username + " logged in");

        res.redirect("events");
      }
      
      else{
        console.log("***** Username and/or Password not found *****");
        res.redirect("/");
      }   
  });
  
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
              type: req.body.type,
              level:0
            };

  if (newUser.type=="Student")
      newUser.level=0;
  else if (newUser.type=="superAdmin")
      newUser.level=2;

  var checkquery = "SELECT COUNT(*) AS User_ID FROM user WHERE User_ID='"+req.body.username+"'";
  var regins1 = "INSERT INTO User (User_ID,name,password,level) VALUES ('"+newUser.username+"','"+newUser.name+"','"+newUser.password+"','"+newUser.level+"');";
  // var regins1 = "INSERT INTO User (User_ID,password,level) VALUES ('"+newUser.username+"','"+newUser.name+"','"+newUser.password+"','"+newUser.level+"');";
  var regins2 = "INSERT INTO Student (User_ID) VALUES ('"+newUser.username+"');";
  var regins3 = "INSERT INTO Super_Admin (User_ID) VALUES ('"+newUser.username+"');";


  connection.query(checkquery, function(err, rows, fields) 
  {
    if (err) 
    {
      console.error(err);
      return;
    }
    else
    {
      if(rows[0].User_ID==0)
      {
        connection.query(regins1, function(err, rows, fields) 
        {
            if (err) throw err;
     
        });


        if(newUser.level==0)
        {
          connection.query(regins2, function(err, rows, fields) 
          {
              if (err) throw err;
       
          });
                      req.session.name = req.body.name;
                      req.session.username = req.body.username;
                      req.session.password = req.body.password;
                      req.session.type = req.body.type;
                      console.log("New user added");
                      res.redirect("events");
        }
        else if(newUser.level==2)
        {
          connection.query(regins3, function(err, rows, fields) 
          {
              if (err) throw err;
       
          });
          req.session.name = req.body.name;
          req.session.username = req.body.username;
          req.session.password = req.body.password;
          req.session.type = req.body.type;
          console.log("New user added");
          res.redirect("events");
        }    

      }
      else
      {
        console.log("***** User " + newUser.username + " already exists *****");    
        res.redirect("register");
      }
  
    }
      
  });
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






module.exports = app;
