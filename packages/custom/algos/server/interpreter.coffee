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
  userName    = req.sessionID
  userPlygDir = "#{__dirname}/playground/#{userId}"
  password    = Math.floor(Math.random() * 65000) + 10000
  userId      = Math.floor(Math.random() * 65000) + 10000
  exec "mkdir -p #{userPlygDir}"
  exec "chown -Rv #{userName} #{userPlygDir}"
  fs.writeFile(userPlygDir + '/script.py', req.code, (err) ->
    if err
      return console.log(err)
    else
      exec "sh #{__dirname}/mkuser.sh #{userName} #{userId} #{password}"
      exec "sudo -u #{userName} python #{userPlygDir}/script.py",{timeout:3000}, (error, stdout, stderr) ->
        if error?
          console.log 'exec error: ' + error
        else if stdout !=""
          res.json(output:stdout)
        else if stderr !=""
          res.json(output: error)
        else
          res.json output: 'something went wrong'
        exec "sudo -u #{userName} kill -9 -1"
        exec "rm -rf #{userPlygDir}"
  )
