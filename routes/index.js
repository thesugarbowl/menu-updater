var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET artwork. */
router.get('/artwork', function(req, res, next) {
  res.render('artwork');
});

/* GET about us. */
router.get('/about-us', function(req, res, next) {
  res.render('about-us');
});

/* GET contact us. */
router.get('/contact-us', function(req, res, next) {
  res.render('contact-us');
});

module.exports = router;
