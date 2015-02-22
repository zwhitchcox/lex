'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Algs = new Module('algs');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Algs.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Algs.routes(app, auth, database);

  Algs.aggregateAsset('css', 'algs.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Algs.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Algs.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Algs.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Algs;
});
