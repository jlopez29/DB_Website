var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res, next) {

  //res.sendFile("../views/index.ejs");
  res.render('register', { title: 'College Life' });
});



module.exports = router;
