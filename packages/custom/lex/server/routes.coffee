'use strict';
subject   = require './subject'
exercise  = require './exercise'

module.exports = (Lex, app, auth, database) ->
  hasAuthorization = (req, res, next) ->
    res.status(401).send 'User is not authorized' if not req.user.isAdmin
    next()

  app.route('/api/model/:modelName/:subjectName/exercises')
    .get(subject.allExercises)
  app.route('/api/model/:modelName/:subjectName/exercises/:exerciseId')
    .get(auth.isMongoId, exercise.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, exercise.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, exercise.destroy)
  app.route('/api/model/:modelName/:subjectName/:moduleName/exercises')
    .get(auth.isMongoId,exercise.byModule)
  app.route('/api/subjects')
    .get(subject.allSubjects)
    .post(auth.requiresLogin, subject.create)
  app.route('/api/subjects/:subjectId')
    .get(subject.subject)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, subject.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, subject.destroy)
  app.route('/api/model/:modelName')
    .post(auth.requiresLogin, exercise.create);
  app.route('/api/model/:modelName/:exerciseId')
    .get(auth.isMongoId, exercise.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, exercise.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, exercise.destroy)
  app.route('/api/clear/:subjectName')
    .delete(auth.requiresLogin,subject.clearModules)
  app.param('subjectId', subject.subject)
  app.param('subjectName', subject.subjectName)
  app.param('modelName', subject.model)
  app.param('moduleName',subject.module)
  app.param('exerciseId',exercise.exercise)
