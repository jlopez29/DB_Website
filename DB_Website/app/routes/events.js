var express = require('express');
var router = express.Router();

router.get('/events', function(req, res) {

  res.render('events', {
    pageTitle: 'events',
    pageID: 'events'
  });

});

module.exports = router;
