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
	password		= Math.floor(Math.random() * 65000) + 10000
	userName		= req.sessionID.substring(1,req.sessionID.length)
	if process.platform == 'darwin'
		userPlygDir = "#{__dirname}/playground/#{userName}"
		userId			= Math.floor(Math.random() * 65000) + 10000
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
	else if process.platform == 'linux'
		exec "sudo su -c \"useradd #{userName} -p #{password} -s /bin/bash -m -g $PRIMARYGRP web\"", (error2, stdout2, stderr) ->
			if error2 == '' or !error2?
				userPlygDir = "/home/#{userName}"
				fs.writeFile userPlygDir + '/script.py', req.code, (err) ->
					if err
						return console.log(err)
					else
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
								exec "deluser #{userName}"
								exec "rm -rf #{userPlygDir}"
			else
				exec "sudo -u #{userName} kill -9 -1"
				exec "deluser #{userName}"
