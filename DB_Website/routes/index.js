var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page */
router.get('/', function(req, res, next) {
	console.log("GET home page");
 	res.render('index');
});

module.exports = router;
