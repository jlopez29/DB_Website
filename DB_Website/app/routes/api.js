var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var feedbackData = require('../data/feedback.json');
var loginData = require('../data/login.json');
var signupData = require('../data/login.json');
var eventsData = require('../data/events.json');

var request = require('request');



router.get('/api', function(req, res) {
  res.json(feedbackData);
});


router.get('/api/login', function(req, res) {
  res.json(loginData);
});

router.get('/api/signup', function(req, res) {
  res.json(signupData);
});

router.get('/api/events', function(req, res) {
  res.json(eventsData);
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/api', function(req, res) {
  feedbackData.unshift(req.body);
  fs.writeFile('app/data/feedback.json', JSON.stringify(feedbackData), 'utf8', function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.json(feedbackData);
});

router.post('/api/events', function(req, res) {
  eventsData.unshift(req.body);
  fs.writeFile('app/data/events.json', JSON.stringify(eventsData), 'utf8', function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.json(eventsData);
});

router.post('/api/login', function(req, res) {

  var traverseData = loginData;

   for(var i = 0; i < traverseData.length; i++)
    {
       if(traverseData[i].email == req.body.email)
       {
          console.log("Found email");
       }
       else
       {        
        console.log("Cannot find email");
       }
    }
    var url = "http://events.ucf.edu/feed.json";

    request({
        url: url,
        json: true
    }, function (error, response, body) {

        console.log('hello');

        if (!error && response.statusCode === 200) {
            console.log(body) // Print the json response
        }
    })
});

router.post('/api/signup', function(req, res) {

  var traverseData = loginData;
  var write = 0;

   for(var i = 0; i < traverseData.length; i++)
    {
       if(traverseData[i].email == req.body.email)
       {
          console.log("Email already exists");
          break;
       }
       else
       {  
          write = 1;
       }
    }
      //write to file

    if(write == 1)
    {
      loginData.unshift(req.body);
      fs.writeFile('app/data/login.json', JSON.stringify(loginData), 'utf8', function(err)
      {
        if (err) 
        {
          console.log(err);
        }
      });

      res.json(loginData);
      console.log("Successfully signed up");
    }
});
    
  



router.delete('/api/:id', function(req, res) {
  feedbackData.splice(req.params.id, 1);
  fs.writeFile('app/data/feedback.json', JSON.stringify(feedbackData), 'utf8', function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.json(feedbackData);
});



module.exports = router;
