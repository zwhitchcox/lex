'use strict';

exports.lang = (req, res, next, lang) ->
  req.lang = lang
  next()
exports.code = (req, res, next, lang) ->
  req.code = code
  next()
exports.interpret = () ->
  
