var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  console.log(req.session.username);
  res.render('users',{username:req.session.username});
  
});

module.exports = router;
