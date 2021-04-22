var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainsite/index');
});

/* GET artwork. */
router.get('/artwork', function(req, res, next) {
  res.render('mainsite/artwork');
});

/* GET about us. */
router.get('/about-us', function(req, res, next) {
  res.render('mainsite/about-us');
});

/* GET contact us. */
router.get('/contact-us', function(req, res, next) {
  res.render('mainsite/contact-us');
});

module.exports = router;
