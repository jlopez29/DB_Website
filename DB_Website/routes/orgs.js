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
	
  //console.log(req.session.username);

  var queryString = "SELECT * FROM rso";

  connection.query(queryString, function(err, rows, fields) 
  {
      if (err) 
      {      	
      	throw err;
      	setTimeout(function(){
          console.log(rows);
          res.render('orgs',{orgs: rows});
        },100);
      }
      	
      else
      {
      	setTimeout(function(){
          console.log(rows);
          res.render('orgs',{orgs: rows});
        },100);
      }
      	
  });
  
});

module.exports = router;
