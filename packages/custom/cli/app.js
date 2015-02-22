'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var CLI = new Module('cli');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
CLI.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  CLI.routes(app, auth, database);

  CLI.aggregateAsset('css', 'cli.css');

  return CLI;
});
