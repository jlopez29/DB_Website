var express = require('express');
var router = express.Router();

router.get('/signup', function(req, res) {

  res.render('signup', {
    pageTitle: 'signup',
    pageID: 'signup'
  });

});

module.exports = router;
