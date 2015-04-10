'use strict';

mongoose = require('mongoose')
Schema = mongoose.Schema

AlgosSchema = new Schema(
  challenge:
    type: String
    required: true
  start:
    type: String
  check:
    type: String
  subject:
    type: Schema.ObjectId
    required: true
    ref: 'Subject'
  module:
    type: String
    required:true
  solution:
    type: String
    required: true
  name:
    type:String
    required: true
)


AlgosSchema.statics.loadBySubject = (subjId, cb) ->
  @.find({subject: subjId})
  .populate('subject', 'name').exec(cb)

mongoose.model('algos', AlgosSchema);
