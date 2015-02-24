'use strict';
var subject = require('../controllers/subject'),
  exercise  = require('../controllers/exercise')

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Lex, app, auth, database) {

  var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin) {
      return res.status(401).send('User is not authorized');
    }
    next();
  };
  app.route('/api/model/:modelName/:subjectName/exercises')
    .get(subject.allExercises)
  app.route('/api/model/:modelName/:subjectName/exercises/:exerciseId')
    .get(auth.isMongoId, exercise.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, exercise.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, exercise.destroy);
  app.route('/api/subjects')
    .get(subject.allSubjects)
    .post(auth.requiresLogin, subject.create);
  app.route('/api/subjects/:subjectId')
    .get(subject.subject)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, subject.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, subject.destroy);
  app.route('/api/model/:modelName')
    .post(auth.requiresLogin, exercise.create);
  app.route('/api/model/:modelName/:exerciseId')
    .get(auth.isMongoId, exercise.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, exercise.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, exercise.destroy);
  app.param('subjectId', subject.subject);
  app.param('subjectName', subject.subjectName);
  app.param('modelName', subject.model);
  app.param('exerciseId',exercise.exercise)

};
