var express = require('express');
var Rooms = require('../models/room.model');
var ErrorHandler = require('../util/error-handler');

var router = express.Router();

/**
 * @desc Get the list of roons in a house.
 * @param {string} familyID
 */
router.get("/", function (req, res, next) {

	Rooms.find(req.query, function (error, rooms) {
		if (error) {
			res.json(ErrorHandler.formatErrorJson(error));
		} else {
			res.json({
				success: true,
				data: rooms
			});
		}
	});

});


/**
 * @desc Add a new room
 */
router.post("/new", function (req, res, next) {
	
	var room = req.body;

	if (!room.title) {
		res.json(ErrorHandler.formatErrorJson("The room title is required to create a new one."));
	} else {
		Rooms.create(room, function(error, room) {
			if(error) {
				res.json(ErrorHandler.formatErrorJson(error));
			} else {
				res.json({
					success: true,
					data: room
				});
			}
		});
	}

});


/**
 * @desc Edit room information.
 */
router.put("/save", function (req, res, next) {

	if (!req.body._id) {
		res.json(ErrorHandler.formatErrorJson("The room ID is required to update."));
	} else {
		var query = { _id: req.body._id };
		Rooms.update(query, req.body, {}, function(error, room) {
			if(error) {
				res.json(ErrorHandler.formatErrorJson(error));
			} else {
				res.json({
					success: true,
					data: room
				});
			}
		});
	}

});


/**
 * @desc Delete a room
 */
router.delete("/delete", function (req, res, next) {
	
	if (!req.body._id) {
		res.json(ErrorHandler.formatErrorJson("The room ID is required to delete."));
	} else {
		var query = { _id: req.body._id };
		Rooms.remove(query, function(error, result) {
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
