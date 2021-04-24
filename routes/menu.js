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

/////////////////////// Authentication
// -------------- POST ROUTES ----------------
router.post('/login', passport.authenticate('local', { failureRedirect: '/menu/login-failure', successRedirect: '/menu/update' }));

router.post('/register', (req, res, next) => {
    const saltHash = genPassword(req.body.pw);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.uname,
        hash: hash,
        salt: salt,
        admin: true
    });

    newUser.save()
        .then((user) => {
            console.log(user);
        });

    res.redirect('/login');
 });

 // -------------- GET ROUTES ----------------

router.get('/login', (req, res, next) => {
    res.render('menu-updater/login');
});

// When you visit http://localhost:3000/register, you will see "Register Page"
router.get('/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="uname">\
                    <br>Enter Password:<br><input type="password" name="pw">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
    
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/menu/login');
});

router.get('/login-failure', (req, res, next) => {
    res.render('menu-updater/login_failure');
});

//////////////////////

// Item routes
// GET menu home page
router.get('/', item_controller.menu);

// GET menu for main site
router.get('/mainsite', item_controller.mainsite_get);

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