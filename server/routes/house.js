var express = require('express');
var router = express.Router();


/**
 * @desc Get the list of houses of a family.
 * @param {string} familyID
 */
router.get("/", function(req, res, next) {
  res.json({res: 'list ' + req.query.familyID });
});


/**
 * @desc Add a new house
 */
router.post("/new", function(req, res, next) {
  res.json({res: 'new'});
});


/**
 * @desc Edit house information.
 */
router.put("/save", function(req, res, next) {
  res.json({res: 'save'});
});


/**
 * @desc Delete a house
 */
router.delete("/delete", function(req, res, next) {
  res.json({res: 'delete'});
});

module.exports = router;
