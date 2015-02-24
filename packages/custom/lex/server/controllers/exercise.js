'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash');



exports.exercise = function(req, res, next, id) {
  req.model.findOne({_id:id}).populate('subject').exec(
    function(err, exercise) {
      if (err) return next(err)
      if (!exercise) return next(new Error('Failed to load exercise ' + id))
      req.exercise = exercise
      next()
    });
}


/**
 * Create an subject
 */
exports.create = function(req, res) {
  var exercise = new req.model(req.body);
  exercise.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the subject'
      });
    }
    res.json(exercise);

  });
};

/**
 * Update an subject
 */
exports.update = function(req, res) {
  var exercise = req.exercise;

  exercise = _.extend(exercise, req.body);
  exercise.save(function(err) {
    console.log(err)
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the exercise'
      });
    }
    res.json(exercise);

  });
};

exports.show = function(req, res) {
  res.json(req.exercise);
};

exports.destroy = function(req, res) {
  var exercise = req.exercise;
  console.log(exercise)
  exercise.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the subject'
      });
    }
    res.json(exercise);

  });
};
