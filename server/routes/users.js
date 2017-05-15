var express = require('express');
var Users = require('../models/user.model');
var ErrorHandler = require('../util/error-handler');
var router = express.Router();

/**
 * @desc register a new user.
 */
router.get("/", function (req, res, next) {

	Users.find({}, function(error, users) {
		if(error) {
			res.json(ErrorHandler.formatErrorJson(error));
		} else {
			res.json({
				success: true,
				data: users
			});
		}
	});

});

/**
 * @desc register a new user.
 */
router.post("/register", function (req, res, next) {

	var user = req.body;
	var error = {};

	if (!user.name || !user.email || !user.password) {
		error.message = "Name, e-mail and password are required to register.";
		res.json(error)
	} else {
		Users.create(user, function (err, user) {
			if (err) {
				error.code = err.code;
				error.message = err.errmsg;
				res.json(error);
			} else {
				res.json({
					success: true,
					data: user
				});
			}
		});
	}
});


/**
 * @desc User login in the app.
 */
router.post("/login", function (req, res, next) {
	res.json({ res: 'login' });
});


/**
 * @desc User logout.
 */
router.post("/logout", function (req, res, next) {
	res.json({ res: 'logout' });
});



module.exports = router;
