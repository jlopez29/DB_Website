var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	
  console.log(req.session.username);
  res.render('events',
  {
  	eventName:req.session.eventName,
  	eventDesc:req.session.eventDesc,
  	eventTime:req.session.eventTime,
  	eventDate:req.session.eventDate,
  	eventLocation:req.session.eventLocation,
  	eventPhone:req.session.eventPhone,
  	eventEmail:req.session.eventEmail
  });
  
});

module.exports = router;
