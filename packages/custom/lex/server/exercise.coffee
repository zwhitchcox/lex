'use strict';

mongoose = require 'mongoose'
Subject = mongoose.model 'Subject'
_ = require 'lodash'



exports.exercise = (req, res, next, id) ->
  req.model.findOne({_id:id}).populate('subject').exec(
    (err, exercise) ->
      return next(err) if (err)
      return next(new Error "Failed to load exercise #{id}") if !exercise
      req.exercise = exercise
      next()
    )

exports.create =  (req, res) ->
  exercise = new req.model req.body
  exercise.save((err) ->
    if err
      console.log err
      return res.status(500).json(
        error: 'Cannot save the subject'
      )

    res.json exercise
  )

exports.update = (req, res) ->
  exercise = req.exercise;

  exercise = _.extend exercise, req.body
  exercise.save((err) ->
    console.log(err)
    if err
      return res.status(500).json(
        error: 'Cannot update the exercise'
      )
    res.json(exercise);
  )

exports.show = (req, res) ->
  res.json req.exercise


exports.destroy = (req, res) ->
  exercise = req.exercise;
  exercise.remove((err) ->
    if (err)
      return res.status(500).json(
        error: 'Cannot delete the subject'
      )
    res.json exercise
  )

exports.byModule = (req, res) ->
  getEx = (err, subj) ->
    return res.status(500).json(error: 'cannot list exercises') if subj == null
    req.model.find(subject:subj._id,module:req.module).exec((err, exercises) ->
      return res.status(500).json(error: 'Cannot list the exercises') if err
      res.json(exercises)
    )
  Subject.findOne(name: $regex: new RegExp("^#{req.subjectName}", 'i')).exec(getEx)
