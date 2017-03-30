var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');

/* GET home page */
router.get('/', function(req, res) {
	console.log('GET register page');
	res.render('register');
});

// router.post('/', function(req, res) {
// 	console.log('POST register page');
// 	res.render('register');
// });

module.exports = router;