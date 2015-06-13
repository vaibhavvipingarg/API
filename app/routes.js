var Shop     = require('../app/models/shop');
var User     = require('../app/models/user');

module.exports = function(app, passport) {
	require("../app/routes/user.js")(app, passport);
	require("../app/routes/shop.js")(app, User);
};