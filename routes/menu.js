var express = require('express');
var router = express.Router();

// Require controller module
var item_controller = require('../controllers/itemController');

// Require authentication modules & dependencies
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const connection = require('../config/database');
const User = connection.models.User;
const isAuth = require('./authMiddleware').isAuth;

// Item routes
// GET menu home page
router.get('/', item_controller.menu);

// GET menu for main site
router.get('/mainsite', item_controller.mainsite_get);

/////////////////////// Authentication
// -------------- POST ROUTES ----------------
router.post('/login', passport.authenticate('local', { failureRedirect: '/menu/login-failure', successRedirect: '/menu/update' }));

 // -------------- GET ROUTES ----------------

router.get('/login', (req, res, next) => {
    res.render('menu-updater/login');
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/menu/login');
});

router.get('/login-failure', (req, res, next) => {
    res.render('menu-updater/wrong_password');
});

//////////////////////

// GET request for updating an item
router.get('/update', isAuth, item_controller.item_update_get);

// POST request for updating an  item
router.post('/update', item_controller.item_update_post);

// GET request for make all food available
router.get('/allavailable', isAuth, item_controller.all_available_get);

// POST request for make all food available
router.post('/allavailable', item_controller.all_available_post);

// GET request for make breakfast unavailable
router.get('/breakfastunavailable', isAuth, item_controller.breakfast_unavailable_get);

// POST request for make breakfast unavailable
router.post('/breakfastunavailable', item_controller.breakfast_unavailable_post);

// GET request for showing item details
router.get('/item/:id', isAuth, item_controller.item_details_get);

// POST request for showing item details
router.post('/item/:id', item_controller.item_details_post);

// GET request for update confirmation
router.get('/item/:id/confirmed', isAuth, item_controller.update_confirmation_get);

module.exports = router;