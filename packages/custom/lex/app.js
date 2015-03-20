'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module,
favicon = require('serve-favicon');

var Lex = new Module('lex');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Lex.register(function(app, auth, database) {
  app.set('views', __dirname + '/server/views');


  //We enable routing. By default the Package Object is passed to the routes
  Lex.routes(app, auth, database);



  Lex.aggregateAsset('css', 'lex.css');
  app.use(favicon(__dirname + '/public/assets/img/favicon.gif'));

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Lex.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Lex.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Lex.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Lex;
});
