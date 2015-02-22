'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  cli = mongoose.model('cli'),
  _ = require('lodash');


/**
 * Find exercise by id
 */
exports.exercise = function(req, res, next, id) {
  cli.load(id, function(err, exercise) {
    if (err) return next(err);
    if (!exercise) return next(new Error('Failed to load exercise ' + id));
    req.exercise = exercise;
    next();
  });
};

/**
 * Create a exercise
 */
exports.create = function(req, res) {
  var exercise = new cli(req.body);
  exercise.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the exercise'
      });
    }
    res.json(exercise);

  });
};

/**
 * Update an exercise
 */
exports.update = function(req, res) {
  var exercise = req.exercise;

  exercise = _.extend(exercise, req.body);

  exercise.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the exercise'
      });
    }
    res.json(exercise);

  });
};

/**
 * Delete an exercise
 */
exports.destroy = function(req, res) {
  var exercise = req.exercise;

  exercise.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the exercise'
      });
    }
    res.json(exercise);

  });
};

/**
 * Show an exercise
 */
exports.show = function(req, res) {
  res.json(req.exercise);
};

/**
 * List of clis
 */
exports.all = function(req, res) {
  cli.find().exec(function(err, exercises) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the exercises'
      });
    }
    res.json(exercises);

  });
};
