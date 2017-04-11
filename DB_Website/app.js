var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var http = require('http');
var url = require('url');


var index = require('./routes/index');
var register = require('./routes/register');
var events = require('./routes/events');
var orgs = require('./routes/orgs');
var universities = require('./routes/universities');


var mysql = require('mysql');
var connection = require("express-myconnection");

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
      if (err)
      {
        console.log("***** DB Error *****");
        res.render("index",{message: "*** DB Error ***"});
        //throw err;
      } 
      if(rows != "")
      {

        if (rows[0].User_ID == currUser.username && rows[0].password == currUser.password)
        {
          req.session.username = req.body.username;
          req.session.password = req.body.password;

          console.log("User: " + currUser.username + " logged in");

          res.redirect("events");
        }

      }
      else
      {

        console.log("***** Username and/or Password not found *****");
        res.render("index",{message: "*** Username and/or Password not found ***"});

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
              level:0,
              email: req.body.email
            };

  if (newUser.type=="Student")
      newUser.level=0;
  else if (newUser.type=="superAdmin")
      newUser.level=2;

  var checkquery = "SELECT COUNT(*) AS User_ID FROM user WHERE User_ID='"+req.body.username+"' OR email='"+req.body.email+"';";
  var regins1 = "INSERT INTO User (User_ID,name,password,level,email) VALUES ('"+newUser.username+"','"+newUser.name+"','"+newUser.password+"','"+newUser.level+"','"+newUser.email+"');";
  // var regins1 = "INSERT INTO User (User_ID,password,level) VALUES ('"+newUser.username+"','"+newUser.name+"','"+newUser.password+"','"+newUser.level+"');";
  var regins2 = "INSERT INTO Student (User_ID) VALUES ('"+newUser.username+"');";
  var regins3 = "INSERT INTO Super_Admin (User_ID) VALUES ('"+newUser.username+"');";
  var enrollquery = "INSERT INTO enrolled (User_ID,University_Name) VALUES ('"+req.body.username+"','"+req.body.uni+"');";

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
                      connection.query(enrollquery,function(err,rows,fields)
                      {
                          if(err) throw err;
                      });
                      console.log("New user added");
                      res.redirect("events");
        }
        else if(newUser.level==2)
        {
          connection.query(regins3, function(err, rows, fields) 
          {
              if (err) throw err;
              connection.query(enrollquery,function(err,rows,fields)
                      {
                          if(err) throw err;
                      });
       
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
        console.log("***** Username " + newUser.username + " already exists *****"); 
        var queryString = "SELECT * FROM university";
        connection.query(queryString, function(err, rows, fields) 
        {
          res.render("register",{message: "***** Username " + newUser.username + " already exists OR e-mail is already in use *****",uni : rows});  
        });
      }
  
    }
      
  });
});







app.post('/events', function(req, res, next) 
{

  var addEvent = "INSERT INTO event (Name,Description,Time,Date,Location,Phone,Email) VALUES ('"+req.body.name+"','"+req.body.description+"','"+req.body.time+"','"+req.body.date+"','"+req.body.location+"','"+req.body.phone+"','"+req.body.email+"');";

  connection.query(addEvent, function(err, rows, fields) 
  {
    if (err) 
    {
      console.error(err);
      return;
    }
  });

  console.log(req.body);
  res.redirect('/events');
});






/* GET users listing. */
app.post('/events/:eventid', function(req, res, next) {

  console.log(req.url);

  var str = req.url

  var eventid = str.replace("/events/","");

  console.log(eventid);

  console.log(req.session.username);

  console.log(req.body);

  var rating;

  if(req.body.rating1)
    rating = 1;
  else if(req.body.rating2)
    rating = 2;
  else if(req.body.rating3)
    rating = 3;
  else if(req.body.rating4)
    rating = 4;
  else
    rating = 5;

  var addEventComment = "INSERT INTO comments (Event_ID,owner,commentString,rating) VALUES ('"+eventid+"','"+req.session.username+"','"+req.body.comments+"','"+rating+"');";

  connection.query(addEventComment, function(err, rows, fields) 
  {
    if (err) 
    {
      console.error(err);
      return;
    }
  });

  res.redirect(req.get('referer'));



});

/* GET users listing. */
app.post('/deletecomment/:id', function(req, res, next) {

  console.log("********* START **********");

  console.log(req.url);

  var str = req.url

  var eventid = str.replace("/deletecomment/","");

  console.log(eventid);

  console.log(req.session.username);

  console.log(req.body);

  console.log("********* END **********");

  var delEventComment = "DELETE FROM comments WHERE id =" + eventid ;

  connection.query(delEventComment, function(err, rows, fields) 
  {
    if (err) 
    {
      console.error(err);
      return;
    }
  });

  res.redirect(req.get('referer'));



});






app.post('/orgs', function(req, res, next) 
{
  var addOrg = "INSERT INTO rso (Name,Admin) VALUES ('"+req.body.name+"','"+req.body.adminEmail+"');";

  console.log("******  START ORG  ******");

  var adminEmail = req.body.adminEmail;
  var usr1Email = req.body.usr1Email;
  var usr2Email = req.body.usr2Email;
  var usr3Email = req.body.usr3Email;
  var usr4Email = req.body.usr4Email;
  var usr5Email = req.body.usr5Email

  adminEmail = adminEmail.replace(/.*@/, "");
  usr1Email = usr1Email.replace(/.*@/, "");
  usr2Email = usr2Email.replace(/.*@/, "");
  usr3Email = usr3Email.replace(/.*@/, "");
  usr4Email = usr4Email.replace(/.*@/, "");
  usr5Email = usr5Email.replace(/.*@/, "");

  console.log(adminEmail);

  console.log("******  END ORG  ******");

  connection.query(addOrg, function(err, rows, fields) 
  {
    if (err) 
    {
      console.error(err);
      return;
    }
  });
  console.log(req.body);

    var queryString = "SELECT * FROM rso";

    var orgData;
    connection.query(queryString, function(err, rows, fields) 
    {
          if (err) 
          {       
            throw err;
            //console.log(rows);
            res.render('orgs',{orgs: rows,message: ""});
          }
            
          else
          {
            if((adminEmail == usr1Email) && (adminEmail == usr2Email) && (adminEmail == usr3Email) && (adminEmail == usr4Email) && (adminEmail == usr5Email))
            {
              console.log("emails match");
              res.render('orgs',{orgs: rows,message:""});
            }    
            else
            {
              console.log("emails don't match");
              res.render('orgs',{orgs: rows,message:"email domain doesn't match"});
            }
          }         
      });
  
});










app.post('/universities', function(req, res, next) 
{
  var addUni = "INSERT INTO university (University_Name,Location,Description,Student_Population) VALUES ('"+req.body.name+"','"+req.body.location+"','"+req.body.description+"','"+req.body.population+"');";
  var checkPriv = "SELECT COUNT(*) AS User_ID FROM super_admin WHERE User_ID = '"+req.session.username+"';";
  var queryString = "SELECT * FROM university";


    connection.query(checkPriv, function(err, rows, fields) 
    {
      if( err) 
        console.log("error");

      if(rows[0].User_ID>0)
      {

          connection.query(addUni, function(err, rows, fields) 
          {
            if (err) 
            {
              console.error(err);
              return;
            }
          });

          console.log(req.body);
          connection.query(queryString, function(err, rows, fields) 
          {
            if (err) 
            {       
              throw err;
              //console.log(rows);
              res.render('universities',{message: "",unis: rows});
            }
              
            else
            {
              //console.log(rows);
              res.render('universities',{message: "",unis: rows});
            }
            
          });

      }
      else
      {
        console.log("you dont have enough badges to add this.");
        connection.query(queryString, function(err, rows, fields) 
        {
          if (err) 
          {       
            throw err;
            //console.log(rows);
            res.render('universities',{message: "",unis: rows});
          }
            
          else
          {
            //console.log(rows);
            res.render("universities",{message: "***** You require Super Admin Privileges to create a new University *****",unis: rows});
          }
            
        });
        
      }

    });
});




module.exports = app;
