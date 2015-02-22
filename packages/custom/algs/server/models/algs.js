'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Algs Schema
 */
var AlgsSchema = new Schema({
  alg: {
    type: String,
    required: true
  },
  solution: {
    type: String,
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
    type: String
  }
});


/**
 * Statics
 */
AlgsSchema.statics.loadBySubject = function(subjId, cb) {
  this.find({
    subject: subjId
  }).populate('subject', 'name').exec(cb);
};

mongoose.model('algs', AlgsSchema);
