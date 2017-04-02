var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var events = require('./routes/events');
var orgs = require('./routes/orgs');
var unis = require('./routes/universities');
var register = require('./routes/register');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
 app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/events', events);
app.use('/orgs', orgs);
app.use('/universities', unis);
app.use('/register', register);

var userCount = 0;
var username = 'user';
var password = 'pass';
var users = [{username: "user",
            password: 'pass',
            userID: 0}];

// POST to login 
  app.post('/', function(req, res){
  console.log(req.body);
  
  var currentUser = verifyUser(req.body);
  console.log("");

  res.send(currentUser);
  res.end('login response');
});

// POST to register
app.post('/register', function(req, res){

  console.log(req.body);
  userCount++;
  var newUser = {username: req.body.username,
              password: req.body.password,
              userID:userCount};

  users.push(newUser);
  
  res.send(newUser);

  console.log("new user created");
  console.log(users);

  res.end('user creation response');
});

// POST to events
app.post('/events', function(req, res){
  //console.log(req.body);
});


function verifyUser(user){
  
  for (var i=0; i<users.length; i++){
    if ((user.username == users[i].username) && (user.password == users[i].password)){
      console.log('logging in user:');
      console.log(users[i]);
      return users[i];
    }
  }

}



module.exports = app;
