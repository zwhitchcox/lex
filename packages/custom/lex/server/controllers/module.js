'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Module = mongoose.model('Module'),
    _ = require('lodash');


/**
 * Find subject by id
 */
exports.module = function(req, res, next, id) {
  Module.load(id, function(err, mymodule) {
    if (err) return next(err);
    if (!mymodule) return next(new Error('Failed to load module ' + id));
    req.module = mymodule;
    next();
  });
};

/**
 * Create an subject
 */
exports.create = function(req, res) {
  var mymodule = new Module(req.body);
  mymodule.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the subject'
      });
    }
    res.json(mymodule);

  });
};

/**
 * Update an subject
 */
exports.update = function(req, res) {

  var mymodule = req.module;

  mymodule = _.extend(mymodule, req.body);
  mymodule.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the subject'
      });
    }
    res.json(mymodule);

  });
};

/**
 * Delete an subject
 */
exports.destroy = function(req, res) {
  var mymodule = req.module;

  mymodule.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the subject'
      });
    }
    res.json(mymodule);

  });
};
