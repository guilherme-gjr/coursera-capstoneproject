var express = require('express');
var Members = require('../models/member.model');
var ErrorHandler = require('../util/error-handler');
var router = express.Router();

/**
 * @desc Get the list of members of a family.
 * @param {string} familyID
 */
router.get("/", function (req, res, next) {
	Members.find(req.query)
		.populate('user')
		.exec(function (error, tasks) {
			if (error) {
				res.json(ErrorHandler.formatErrorJson(error));
			} else {
				res.json({
					success: true,
					data: tasks
				});
			}
		});
});


/**
 * @desc Add a new family member
 */
router.post("/new", function (req, res, next) {

	var member = req.body;

	if (!member.user || !member.role) {
		res.json(ErrorHandler.formatErrorJson("The member role and user ID area required to create a new one."));
	} else {
		Members.create(member, function (error, member) {
			if (error) {
				res.json(ErrorHandler.formatErrorJson(error));
			} else {
				res.json({
					success: true,
					data: member
				});
			}
		});
	}

});


/**
 * @desc Edit family member information.
 */
router.put("/save", function (req, res, next) {
	if (!req.body._id || !req.body.role) {
		res.json(ErrorHandler.formatErrorJson("The member role and ID are required to update."));
	} else {
		var member = { role: req.body.role };
		var query = { _id: req.body._id };
		Members.update(query, member, {}, function (error, member) {
			if (error) {
				res.json(ErrorHandler.formatErrorJson(error));
			} else {
				res.json({
					success: true,
					data: member
				});
			}
		});
	}
});


/**
 * @desc Delete a family member
 */
router.delete("/delete", function (req, res, next) {
	res.json({ res: 'delete' });
});

module.exports = router;
