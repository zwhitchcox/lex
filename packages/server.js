'use strict';
var mean;

mean = require('meanio');

mean.serve({}, (function(_this) {
  return function(app) {
    var config, port;
    config = app.config.clean;
    port = config.https && config.https.port ? config.https.port : config.http.port;
    return console.log("Mean app started on port " + port);
  };
})(this));
