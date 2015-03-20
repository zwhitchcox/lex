'use strict';

mean = require 'meanio'

mean.serve({}, (app) =>
  config = app.config.clean;
  port = if config.https and config.https.port then config.https.port else config.http.port;
  console.log("Mean app started on port #{port}");
)
