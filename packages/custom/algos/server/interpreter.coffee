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
  userName    = req.sessionID.substring(1,req.sessionID.length)
  userPlygDir = "#{__dirname}/playground/#{userName}"
  password    = Math.floor(Math.random() * 65000) + 10000
  userId      = Math.floor(Math.random() * 65000) + 10000
  exec "mkdir -p #{userPlygDir}", (error1, stdout1, stderr1) ->
    console.log error1, stdout1, stderr1
    fs.writeFile userPlygDir + '/script.py', req.code, (err) ->
      if err
        return console.log(err)
      else
        exec "sh #{__dirname}/mkuser.sh #{userName} #{userId} #{password}", (error2, stdout2, stderr) ->
          exec "chown -Rv #{userName} #{userPlygDir}", (error3,stdout3,stderr3) ->
            exec "sudo -u #{userName} python #{userPlygDir}/script.py",{timeout:3000}, (error, stdout, stderr) ->
              if error?
                res.json(output: stderr)
              else if stdout !=""
                res.json(output:stdout)
              else if stderr !=""
                res.json(output: stderr)
              else
                res.json output: """
                Something went wrong.
                Your script only has 3 seconds to execute (for safety reasons).
                You may not have output anything, dingbat.
                """
              exec "sudo -u #{userName} kill -9 -1"
              exec "rm -rf #{userPlygDir}"
              exec "dscl . -delete /Users/#{userName}"
