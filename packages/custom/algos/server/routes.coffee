'use strict'
interpreter = require './interpreter'

module.exports = (Algos, app, auth, database) ->
  hasAuthorization = (req, res, next) ->
    res.status(401).send 'User is not authorized' if not req.user.isAdmin
    next()

  app.route('/api/interpret/:lang/:code')
    .get(interpreter.interpret)
  app.param('lang', interpreter.lang)
  app.param('code', interpreter.code)
