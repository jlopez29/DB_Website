var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {

  //res.sendFile("../views/index.ejs");
  res.render('index', { title: 'College Life' });
});

router.post('/', function(req, res, next) {

  //res.sendFile("../views/index.ejs");
  //res.render('index', { title: 'College Life' });
  console.log(req.body.username);
  console.log(req.body.password);
});

module.exports = router;
