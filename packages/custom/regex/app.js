'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Regex = new Module('regex');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Regex.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Regex.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Regex.menus.add({
    title: 'Regular Expressions',
    link: 'regex',
    roles: ['authenticated','anonymous'],
    menu: 'main'
  });

  Regex.aggregateAsset('css', 'regex.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Regex.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Regex.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Regex.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Regex;
});
