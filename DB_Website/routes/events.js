var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page */
router.get('/', function(req, res) {
	console.log('GET events page');
	res.render('events');
});

module.exports = router;