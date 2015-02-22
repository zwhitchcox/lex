'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Subject Schema
 */
    var ModuleSchema = new Schema({
      name: {
        type:String,
        require: true
      }
    });


/**
 * Statics
 */
ModuleSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

mongoose.model('Module', ModuleSchema);
