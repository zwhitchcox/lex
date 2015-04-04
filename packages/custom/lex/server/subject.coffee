'use strict';


mongoose = require 'mongoose'
Subject = mongoose.model 'Subject'
User = mongoose.model 'User'
_ = require 'lodash'


exports.subject = (req, res, next, id) ->
  Subject.load(id, (err, subject) ->
    return next(err) if (err)
    return next(new Error "Failed to load subject #{id}") if !subject
    req.subject = subject;
    next();
  )


exports.exercise = (req, res, next, id) ->
  req.model.findOne({_id:id}).populate('subject').exec(
    (err, exercise) ->
      return next err if err
      return next(new Error "Failed to load exercise #{id}") if !exercise
      req.exercise = exercise
      next()
    )

exports.create = (req, res) ->
  subject = new Subject(req.body);

  subject.save((err) ->
    if (err)
      console.log(err)
      return res.status(500).json(
        error: 'Cannot save the subject'
      )
    res.json(subject);
  )

exports.update = (req, res) ->
  subject = req.subject;
  subject = _.extend(subject, req.body)
  console.log subject
  subject.save((err) ->
    if (err)
      return res.status(500).json(
        error: 'Cannot update the subject'
      )
    res.json(subject);
  )


exports.destroy = (req, res) ->
  subject = req.subject;
  subject.remove((err) ->
    if (err)
      console.log(err)
      return res.status(500).json(
        error: 'Cannot delete the subject'
      )
    res.json(subject)
  )

exports.allExercises = (req, res) ->
  getEx = (err, subj) ->
    return res.status(500).json(error: 'cannot list exercises') if subj == null
    req.model.find(subject:subj._id).exec((err, exercises) ->
      return res.status(500).json(error: 'Cannot list the exercises') if err
      moduleIdxs = {}
      modules = []
      subj.modules.forEach((el,idx)->
        moduleIdxs[el] = idx
        modules.push({name:el,exercises:[]})
      )
      exercises.forEach((el) ->
        modules[moduleIdxs[el.module]].exercises.push(el)
      )
      res.json(modules)
    )
  Subject.findOne(name: $regex: new RegExp("^#{req.subjectName}", 'i')).exec(getEx)


exports.allSubjects = (req,res) ->
  Subject.find().exec((err, subjects) ->
    if err
      console.log err
    return res.status(500).json(error: 'Cannot list the subjects') if (err)
    res.json(subjects);
  )

exports.subjectName = (req, res, next, subjectName) ->
  req.subjectName = subjectName
  next()

exports.model = (req, res, next, modelName) ->
  req.model = mongoose.model(modelName)
  next()

exports.module = (req, res, next, moduleName) ->
  req.module = moduleName
  next()

exports.clearModules = (req,res) ->
  req.user.modules[req.subjectName] =[]
  req.user.save(res.send({status:'saved'}))
