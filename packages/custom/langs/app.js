'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Langs = new Module('langs');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Langs.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Langs.routes(app, auth, database);

  Langs.menus.add({
    title: 'Command Line Interface',
    link: 'cli',
    roles: ['anonymous','authenticated'],
    menu: 'main'
  });

  //We are adding a link to the main menu for all authenticated users

  Langs.aggregateAsset('css', 'langs.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Langs.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Langs.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Langs.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Langs;
});
