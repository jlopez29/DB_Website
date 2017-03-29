var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/orgs', function (req, res) {

    res.render('orgs', viewData);
});

// router.post('/events', function (req, res) {
//     // authenticate using api to maintain clean separation between layers
//     });
// });

module.exports = router;