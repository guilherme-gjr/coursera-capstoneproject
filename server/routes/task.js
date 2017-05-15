var express = require('express');
var Tasks = require('../models/task.model');
var ErrorHandler = require('../util/error-handler');

var router = express.Router();

/**
 * @desc Get the list of tasks of a family.
 * @param {string} familyID this parameter should be passed as queryString parameter.
 */
router.get("/", function (req, res, next) {
	getTasks(req.query, res);
});


/**
 * @desc Get the list of tasks for the user logged in
 */
router.get("/my", function (req, res, next) {
	getTasks(req.query, res);
});


/**
 * @desc Get the list of tasks that the user can assign to yourself.
 */
router.get("/available", function (req, res, next) {

	var filter = {
		completed: false,
		assignedTo: null
	};

	getTasks(filter, res);

});


/**
 * @desc Add a new task
 */
router.post("/new", function (req, res, next) {

	var task = req.body;

	if (!task.title) {
		res.json(ErrorHandler.formatErrorJson("The task title is required to create a new one."));
	} else {
		Tasks.create(task, function(error, task) {
			if(error) {
				res.json(ErrorHandler.formatErrorJson(error));
			} else {
				res.json({
					success: true,
					data: task
				});
			}
		});
	}

});


/**
 * @desc Edit task information.
 */
router.put("/save", function (req, res, next) {
	
	updateTask(req.body._id, req.body, res);

});


/**
 * @desc Delete a task
 */
router.delete("/delete", function (req, res, next) {


	console.log(req.body)

	if (!req.body._id) {
		res.json(ErrorHandler.formatErrorJson("The task ID is required to delete."));
	} else {
		var query = { _id: req.body._id };
		Tasks.remove(query, function(error, result) {
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


/**
 * @desc Assign a task
 */
router.put("/assign", function (req, res, next) {

	var task = {
		assignedTo: req.body.assignedTo
	};

	updateTask(req.body._id, task, res);
});


/**
 * @desc Unassign a task
 */
router.put("/unassign", function (req, res, next) {
	var task = {
		assignedTo: null
	};

	updateTask(req.body._id, task, res);
});


/**
 * @desc Mark a task as completed
 */
router.put("/conclude", function (req, res, next) {
	var task = {
		completed: req.body.completed
	};

	updateTask(req.body._id, task, res);
});

/**
 * @desc Get information to generate the application reports
 * @param {string} Option the type of information that will be returned
 */
router.get("/report", function (req, res, next) {
	res.json({ res: 'report' });
});



function updateTask(id, task, res) {
	if (!id) {
		res.json(ErrorHandler.formatErrorJson("The task ID are required to update."));
	} else {
		var query = { _id: id };
		Tasks.update(query, task, {}, function(error, task) {
			if(error) {
				res.json(ErrorHandler.formatErrorJson(error));
			} else {
				res.json({
					success: true,
					data: task
				});
			}
		});
	}
}


function getTasks(filter, res) {
	filter = filter || {};
	Tasks.find(filter)
		.populate('createdBy')
		.populate('user')
		.exec(function (error, tasks) {
			if (error) {
				res.json(ErrorHandler.formatErrorJson(error));
			} else {

				 var options = {
					path: 'createdBy.user',
					model: 'User'
				};

				Tasks.populate(tasks, options, function (err, tasks) {
					res.json({
						success: true,
						data: tasks
					});
				});
			}
		});
}



module.exports = router;
