'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Langs Schema
 */
var LangsSchema = new Schema({
  challenge: {
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
LangsSchema.statics.loadBySubject = function(subjId, cb) {
  this.find({
    subject: subjId
  }).populate('subject', 'name').exec(cb);
};

mongoose.model('langs', LangsSchema);
