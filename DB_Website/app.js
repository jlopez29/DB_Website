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
var login = require('./routes/login');
var register = require('./routes/register');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/events', events);
app.use('/orgs', orgs);
app.use('/universities', unis);
app.use('/login', login);
app.use('/register', register);

app.get('/', function(req,res)
{
});

app.get('/events', function(req,res)
{
});

app.get('/orgs', function(req,res)
{
});

app.get('/universities', function(req,res)
{
});

app.get('/login', function(req,res)
{
});

app.get('/register', function(req,res)
{
});


// app.post('/register/adduser', function(req,res)
// {

// });
module.exports = app;
