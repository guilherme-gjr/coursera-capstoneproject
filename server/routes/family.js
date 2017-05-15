var express = require('express');
var Families = require('../models/family.model');
var ErrorHandler = require('../util/error-handler');

var router = express.Router();

/**
 * @desc get the list of families.
 */
router.get("/", function (req, res, next) {

	Families.find({}, function (error, families) {
		if (error) {
			res.json(ErrorHandler.formatErrorJson(error));
		} else {
			res.json({
				success: true,
				data: families
			});
		}
	});
	
});


/**
 * @desc register a new family.
 */
router.post("/new", function (req, res, next) {
	
	var family = req.body;

	if (!family.name) {
		res.json(ErrorHandler.formatErrorJson("The family name is required to create a new one."));
	} else {
		Families.create(family, function(error, family) {
			if(error) {
				res.json(ErrorHandler.formatErrorJson(error));
			} else {
				res.json({
					success: true,
					data: family
				});
			}
		});
	}

});


/**
 * @desc Save changes in a family.
 */
router.put("/save", function (req, res, next) {

	if (!req.body._id || !req.body.name) {
		res.json(ErrorHandler.formatErrorJson("The family name and ID are required to update."));
	} else {
		var family = { name: req.body.name };
		var query = { _id: req.body._id };
		Families.update(query, family, {}, function(error, family) {
			if(error) {
				res.json(ErrorHandler.formatErrorJson(error));
			} else {
				res.json({
					success: true,
					data: family
				});
			}
		});
	}
});


/**
 * @desc delete a family.
 */
router.delete("/delete", function (req, res, next) {
	
	if (!req.body._id) {
		res.json(ErrorHandler.formatErrorJson("The family ID is required to delete."));
	} else {
		var query = { _id: req.body._id };
		Families.remove(query, function(error, result) {
			if(error) {
				res.json(ErrorHandler.formatErrorJson(error));
			} else {
				res.json({
					success: true,
					data: result
				});
			}
		});
	}

});


module.exports = router;
