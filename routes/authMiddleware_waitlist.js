module.exports.isAuthWaitlist = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.render('waitlist/protected_page');
    }
}