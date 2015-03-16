'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Algos = new Module('algos');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Algos.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Algos.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Algos.menus.add({
    title: 'Algorithms',
    link: 'algos',
    roles: ['authenticated','anonymous'],
    menu: 'main'
  });

  Algos.aggregateAsset('css', 'algos.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Algos.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Algos.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Algos.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Algos;
});
