var express = require('express');
var router = express.Router();

// Require controller modules
var wait_controller = require('../controllers/waitController');

// Require authentication modules & dependencies
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const connection = require('../config/database');
const User = connection.models.User;
const isAuthWaitlist = require('./authMiddleware_waitlist').isAuthWaitlist;

/////////////////////// Authentication
// -------------- POST ROUTES ----------------
router.post('/login', passport.authenticate('local', { failureRedirect: '/waitlist/login-failure', successRedirect: '/waitlist/sessions/waiting' }));

 // -------------- GET ROUTES ----------------

router.get('/login', (req, res, next) => {
    res.render('waitlist/login');
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/waitlist/login');
});

router.get('/login-failure', (req, res, next) => {
    res.render('waitlist/login_failure');
});

//////////////////////

/// WAIT ROUTES ///

router.get('/faq', isAuthWaitlist, wait_controller.faq);

// GET request for creating a Wait. NOTE This must come before routes that display Wait (uses id).
router.get('/session/create', isAuthWaitlist, wait_controller.wait_create_get);

// POST request for creating Wait
router.post('/session/create', wait_controller.wait_create_post);

// GET request for creating Wait (FOR GUEST)
router.get('/guest/create', wait_controller.wait_create_get_guest);

// POST request for creating Wait (FOR GUEST)
router.post('/guest/create', wait_controller.wait_create_post_guest);

// GET request to delete Wait
router.get('/session/:id/delete', isAuthWaitlist, wait_controller.wait_delete_get);

// POST request to delete Wait
router.post('/session/:id/delete', wait_controller.wait_delete_post);

// GET request to delete Wait (GUEST)
router.get('/guest/:id/remove', wait_controller.wait_delete_guest_get);

// POST request to delete Wait (GUEST)
router.post('/guest/:id/remove', wait_controller.wait_delete_guest_post);

// GET request to update Wait
router.get('/session/:id/update', isAuthWaitlist, wait_controller.wait_update_get);

// POST request to update Wait
router.post('/session/:id/update', wait_controller.wait_update_post);

// GET request to update Wait (FOR GUEST)
router.get('/guest/:id/update', wait_controller.wait_update_get_guest);

// POST request to update Wait (FOR GUEST)
router.post('/guest/:id/update', wait_controller.wait_update_post_guest);

// GET request to notify Session by SMS
// router.get('/session/:id/notify', session_controller.session_notify_get);

// GET request to notify Wait by Phone
router.get('/session/:id/notifyphone', isAuthWaitlist, wait_controller.wait_phonedGuest_get);

// POST request to notify Wait by Phone
router.post('/session/:id/notifyphone', wait_controller.wait_phonedGuest_post);

// GET request for one Wait
router.get('/session/:id', isAuthWaitlist, wait_controller.wait_detail);

// POST request to notify Wait by SMS
router.post('/session/:id', wait_controller.wait_notify_post);

// GET request for one Wait's position-in-line
router.get('/guest/:id/position', wait_controller.wait_position);

// POST request to confirm Wait
router.post('/guest/:id/position', wait_controller.wait_confirm_post);

// GET request for list of 'all' Waits
router.get('/sessions', isAuthWaitlist, wait_controller.wait_list_all); 

// GET request for list of 'waiting' Waits
router.get('/sessions/waiting', isAuthWaitlist, wait_controller.wait_list_waiting); 

// GET request for list of 'notified' Waits
router.get('/sessions/notified', isAuthWaitlist, wait_controller.wait_list_notified); 

// GET request for list of 'confirmed' Waits
router.get('/sessions/confirmed', isAuthWaitlist, wait_controller.wait_list_confirmed); 

// GET request to list of 'Archived' Waits
router.get('/sessions/archived', isAuthWaitlist, wait_controller.wait_list_archived);

// GET request to archive Confirmed Waits
router.get('/sessions/archive-request-confirmed', isAuthWaitlist, wait_controller.wait_archiveRequestConfirmed_get);

// POST request to archive Confirmed Waits
router.post('/sessions/archive-request-confirmed', isAuthWaitlist, wait_controller.wait_archiveRequestConfirmed_post);

// GET request to archive Notified Waits
router.get('/sessions/archive-request-notified', isAuthWaitlist, wait_controller.wait_archiveRequest_get);

// POST request to archive Notified Waits
router.post('/sessions/archive-request-notified', isAuthWaitlist, wait_controller.wait_archiveRequest_post);

// GET request to archive Waiting Waits
router.get('/sessions/archive-request-waiting', isAuthWaitlist, wait_controller.wait_archiveRequestWaiting_get);

// POST request to archive Waiting Waits
router.post('/sessions/archive-request-waiting', isAuthWaitlist, wait_controller.wait_archiveRequestWaiting_post);

// GET request to notify ALL Waiting Waits
// router.get('/sessions/notify-all', isAuthWaitlist, wait_controller.wait_notifyAll_get);

// POST request to notify ALL Waiting Waits
// router.post('/sessions/notify-all', isAuthWaitlist, wait_controller.wait_notifyAll_post);

module.exports = router;