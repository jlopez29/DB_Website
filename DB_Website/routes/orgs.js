var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page */
router.get('/', function(req, res) {
	console.log('GET orgs page');
	res.render('orgs');
});

module.exports = router;