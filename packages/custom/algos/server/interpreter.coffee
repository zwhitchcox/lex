'use strict';
fs = require('fs')
exec = require('child_process').exec

exports.lang = (req, res, next, lang) ->
  req.lang = lang
  next()
exports.code = (req, res, next, code) ->
  req.code = code
  next()
exports.interpret = (req,res) ->
  userDir = 'Users/'+req.sessionID
  createUserChild = exec("echo pwd | sudo -S -u root #{userDir}", (error, stdout, stderr) ->
    if error?
      console.log 'exec error: ' + error
  )

  mkdirp(plgDir,(err) ->
    fs.writeFile(plgDir + '/test.py', req.code, (err) ->
      if err
        return console.log(err);

      child = exec("echo pwd | sudo -S -u #{req.sessionID} python3 #{plgDir}/test.py", (error, stdout, stderr) ->
        if error?
          console.log 'exec error: ' + error
      )
      child.stdout.on('data',  (data) ->
        res.json(output:data)
      )
      child.stderr.on('data',  (data) ->
        res.json(error:data)
      )

    )
  )
