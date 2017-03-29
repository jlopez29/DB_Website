var express = require('express');
var router = express.Router();
var config = require('config.json');
var eventsData = require('../app/data/events.json');

router.get('/events', function (req, res) {

	console.log('hello');

	// //get feed
 //    var url = "http://events.ucf.edu/feed.json";

 //    request({
 //        url: url,
 //        json: true
 //    }, function (error, response, body) {

 //        console.log(body);

    //     if (!error && response.statusCode === 200) {

    //       eventsData.unshift(body);
    //       fs.writeFile('./app/data/events.json', JSON.stringify(body), 'utf8', function(err) {
    //         if (err) {
    //           console.log(err);
    //         }
    //       });          
    //     }
    // });
    
    res.render('events');
});

// router.post('/events', function (req, res) {
//     // authenticate using api to maintain clean separation between layers
//     });
// });

module.exports = router;