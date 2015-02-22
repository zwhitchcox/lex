'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Subject Schema
 */
var SubjectSchema = new Schema({
  name: {
    type:String,
    require: true
  },
  type: {
    type:String,
    required: true
  },
  modules:[{ type: Schema.Types.ObjectId, ref: 'Module' }]
});


/**
 * Statics
 */
SubjectSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

mongoose.model('Subject', SubjectSchema);
