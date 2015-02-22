'use strict';

angular.module('mean.cli').config(['$stateProvider',
  function($stateProvider) {

    //Setting up route
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/api/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/auth/login');
        }
      });

      return deferred.promise;
    };

    // states for my app
    $stateProvider
      .state('cli', {
        url: '/cli/:subjectName',
        templateUrl: 'cli/views/index.html'
      })
      .state('create cli exercise', {
        url: '/edit/cli/:subjectName/create',
        templateUrl: 'cli/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit cli exercise', {
        url: '/edit/cli/:exerciseId',
        templateUrl: 'cli/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })

  }
]);
