var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page */
router.get('/:eventname', function(req, res, next) {

  var eventname = req.params.eventname;
  console.log(eventname);

  res.sendFile(path.resolve(__dirname + '/../views/event.html/'));
});

/* GET home page */
router.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../views/event.html'));
});


module.exports = router;