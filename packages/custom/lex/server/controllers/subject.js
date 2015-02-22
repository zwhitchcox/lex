'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Subject = mongoose.model('Subject'),
    _ = require('lodash');


/**
 * Find subject by id
 */
exports.subject = function(req, res, next, id) {
  Subject.load(id, function(err, subject) {
    if (err) return next(err);
    if (!subject) return next(new Error('Failed to load subject ' + id));
    req.subject = subject;
    next();
  });
};

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
  var subject = new Subject(req.body);

  subject.save(function(err) {
    if (err) {
      console.log(err)
      return res.status(500).json({
        error: 'Cannot save the subject'
      });
    }
    res.json(subject);

  });
};

/**
 * Update an subject
 */
exports.update = function(req, res) {

  var subject = req.subject;

  subject = _.extend(subject, req.body);
  subject.save(function(err) {
    if (err) {
      console.dir(err)
      return res.status(500).json({
        error: 'Cannot update the subject'
      });
    }
    res.json(subject);

  });
};

/**
 * Delete an subject
 */
exports.destroy = function(req, res) {
  var subject = req.subject;

  subject.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the subject'
      });
    }
    res.json(subject);

  });
};

/**
 * List of Subjects
 */
exports.all = function(req, res) {
  Subject.find().exec(function(err, subjects) {
    if (err) {
      console.log(err)
      return res.status(500).json({
        error: 'Cannot list the subjects'
      });
    }
    res.json(subjects);

  });
};

exports.exercises = function(req, res, next, subjectName) {
  Subject.findOne({name:{ $regex: new RegExp("^" + subjectName, "i") }}).exec(getEx)
  function getEx (err, subj) {
      if (subj === null) {
        return res.status(500).json({error:'cannot list exercises'})
      }
      req.model.find({subject:subj._id}).populate('subject').exec(function(err, exercises) {
      if (err) {
        return res.status(500).json({
          error: 'Cannot list the exercises'
        });
      }
      res.json(exercises);
    });
  }
};

exports.model = function(req, res, next, modelName) {
  req.model = mongoose.model(modelName)
  next()
};
