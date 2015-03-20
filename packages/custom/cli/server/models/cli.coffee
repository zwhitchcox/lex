'use strict';

mongoose = require('mongoose')
Schema = mongoose.Schema

CLISchema = new Schema(
  challenge:
    type: String,
    required: true
  sample:
    type: String,
    trim:true
  check:
    type: String,
    trim: true
  output:
    type: String
  subject:
    type: Schema.ObjectId,
    required: true,
    ref: 'Subject'
  module:
    type: String,
    required:true
  next:
    type: Schema.ObjectId,
    ref: 'cli'

)


CLISchema.statics.loadBySubject = (subjId, cb) -> @
  .find({subject: subjId})
  .populate('subject', 'name').exec(cb)

mongoose.model('cli', CLISchema);
