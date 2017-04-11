var express = require('express');
var router = express.Router();

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
    var queryString = "SELECT * FROM rso";

    setTimeout(function()
    {

      connection.query(queryString, function(err, rows, fields) 
      {
          if (err) 
          {      	
          	throw err;
            //console.log(rows);
            res.render('orgs',{orgs: rows});
          }
          	
          else
          {
            //console.log(rows);
            res.render('orgs',{orgs: rows});
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


router.get('/:rsoid', function(req, res, next) {

  console.log(req.url);

  var str = req.url

  var rsoID = str.replace("/","");

  console.log(rsoID);



  if(req.session.username)
  {
    
    console.log("User: " + req.session.username + " logged in");
    var queryString = "SELECT * FROM rso WHERE RSO_ID='"+rsoID+"'";

    setTimeout(function()
    {

      connection.query(queryString, function(err, rows, fields) 
      {
        console.log(rows);
          if (err) 
          {       
            throw err;
            //console.log(rows);
            res.render('viewRSO',{orgs: rows});          
          }
            
          else
          {
            //console.log(rows);
            res.render('viewRSO',{orgs: rows});          
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
