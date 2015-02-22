'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * CLI Schema
 */
var CLISchema = new Schema({
  challenge: {
    type: String,
    required: true
  },
  solutions: {
    type: Array,
    trim: true
  },
  output: {
    type: String,
    required:true
  },
  subject: {
    type: Schema.ObjectId,
    require: true,
    ref: 'Subject'
  },
  module: {
    type: Schema.ObjectId,
    ref: 'Module'
  }
});


/**
 * Statics
 */
CLISchema.statics.loadBySubject = function(subjId, cb) {
  this.find({
    subject: subjId
  }).populate('subject', 'name').exec(cb);
};

mongoose.model('cli', CLISchema);
