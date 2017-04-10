var express = require('express');
var router = express.Router();
var http = require('http');
var url = require('url');

var mysql = require('mysql');
var connection = require("express-myconnection");

var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'mydb',
    }
);

/* GET users listing. */
router.get('/', function(req, res, next) {

  if(req.session.username)
  {
    
    console.log("User: " + req.session.username + " logged in");
    var queryString = "SELECT * FROM event";

    setTimeout(function()
    {

      connection.query(queryString, function(err, rows, fields) 
      {
          if (err) 
          {       
            throw err;
            //console.log(rows);
            res.render('events',{events: rows});          
          }
            
          else
          {
            //console.log(rows);
            res.render('events',{events: rows});          
          }          
      });
    },200);
  }
  else
  {
    console.log("user not logged in");
    res.redirect('/');
  }

  
  
});

/* GET users listing. */
router.get('/:eventname', function(req, res, next) {

  console.log(req.url);

  var str = req.url

  var eventName = str.replace("/","");

  console.log(eventName);



  if(req.session.username)
  {
    
    console.log("User: " + req.session.username + " logged in");
    var queryString = "SELECT * FROM event WHERE Event_ID='"+eventName+"'";

    setTimeout(function()
    {

      connection.query(queryString, function(err, rows, fields) 
      {
        console.log(rows);
          if (err) 
          {       
            throw err;
            //console.log(rows);
            res.render('viewevent',{events: rows});          
          }
            
          else
          {
            //console.log(rows);
            res.render('viewevent',{events: rows});          
          }          
      });
    },200);
  }
  else
  {
    console.log("user not logged in");
    res.redirect('/');
  }

  
  
});




module.exports = router;
