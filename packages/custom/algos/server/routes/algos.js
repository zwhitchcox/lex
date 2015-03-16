'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Algos, app, auth, database) {

  app.get('/algos/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/algos/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/algos/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/algos/example/render', function(req, res, next) {
    Algos.render('index', {
      package: 'algos'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
