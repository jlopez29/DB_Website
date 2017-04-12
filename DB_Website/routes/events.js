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
router.get('/:eventid', function(req, res, next) {

  console.log("id");

  console.log(req.url);

  var str = req.url

  var eventid = str.replace("/","");

  console.log(eventid);



  if(req.session.username)
  {
    
    console.log("User: " + req.session.username + " logged in");
    

    setTimeout(function()
    { 
      var queryComments = "SELECT * FROM comments WHERE Event_ID='"+eventid+"'";
      var coms;

      connection.query(queryComments, function(err, rows, fields) 
      {
        if (err) 
          throw err;                   
        else
        {
          coms = rows;
        }

      });

      setTimeout(function()
      { 

        console.log("COMS: " + coms);
      },200);

        var queryEvent = "SELECT * FROM event WHERE Event_ID='"+eventid+"'";

        connection.query(queryEvent, function(err, rows, fields) 
        {
          console.log(rows);
          console.log("COMS: " + JSON.stringify(coms));
            if (err) 
            {       
              throw err;
              //console.log(rows);
              res.render('viewevent',{events: rows,comments: coms});          
            }
              
            else
            {
              //console.log(rows);
              res.render('viewevent',{events: rows,comments: coms});          
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


router.get('/filter/private', function(req, res, next) {
  console.log("oooooooooooooo");
  console.log(req.originalUrl)

  if(req.session.username)
  {
    
    console.log("User: " + req.session.username + " logged in");

    var queryUser = "SELECT * FROM enrolled WHERE User_ID='" + req.session.username +"';";

    var university;

      connection.query(queryUser, function(err, rows, fields) 
        {
            if (err) 
            {       
              throw err;
              console.log(rows);
            }
              
            else
            {
              university = rows[0].University_Name;
              

              console.log(rows[0].University_Name);
            }          
        });

    

    setTimeout(function()
    {
      var queryString = "SELECT * FROM event WHERE University_Name='"+university+"';";
      console.log("uni: " + university);

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

router.get('/filter/rso', function(req, res, next) {
  console.log("oooooooooooooo");
  console.log(req.originalUrl)

  if(req.session.username)
  {
    
    console.log("User: " + req.session.username + " logged in");

    var queryUser = "SELECT * FROM member_of WHERE User_ID='" + req.session.username +"';";

    var rso;

      connection.query(queryUser, function(err, rows, fields) 
        {
            if (err) 
            {       
              throw err;
              console.log(rows);
            }
              
            else
            {
              rso = rows[0].RSO_ID;
              

              console.log(rows[0].RSO_ID);
            }          
        });

    

    setTimeout(function()
    {
      var queryString = "SELECT * FROM event WHERE RSO_ID='"+rso+"';";
      console.log("rso_id: " + rso);

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




module.exports = router;
