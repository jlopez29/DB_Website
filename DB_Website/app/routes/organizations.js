var express = require('express');
var router = express.Router();

router.get('/organizations', function(req, res) {

  res.render('organizations', {
    pageTitle: 'organizations',
    pageID: 'organizations'
  });

});

module.exports = router;
