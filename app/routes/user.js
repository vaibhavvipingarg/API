var User     = require('../../app/models/user');

module.exports = function(router, passport) {

	// PROFILE SECTION =========================

	// process the login form - Retrieve User
	router.get('/user', passport.authenticate('local-login'), function(req, res) {
		console.log(req.user);
		res.json(req.user);
	});

	// process the signup form - Create User
	router.post('/user', passport.authenticate('local-signup'), function(req, res) {
		console.log(req.user);
		res.json(req.user);
	});

	// normal routes ===============================================================
	router.get('/error', function(req, res) {
		res.json("500-Error");
	});

	router.get('/profile', isLoggedIn, function(req, res) {
		res.json(req.user);
	});

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/error');
}