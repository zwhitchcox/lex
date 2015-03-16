'use strict';

mongoose = require 'mongoose'

Schema = mongoose.Schema

SubjectSchema = new Schema(
  name:
    type:String,
    require: true
  type:
    type:String,
    required: true

  modules: [String]
)

SubjectSchema.statics.load = (id, cb) -> @findOne(_id: id).exec cb;

mongoose.model 'Subject', SubjectSchema
