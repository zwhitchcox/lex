'use strict';

angular.module('mean.lex').config(['$stateProvider',
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
    }



    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'lex/views/index.html'
    })
    .state('subjects', {
      url: '/subjects',
      templateUrl: 'lex/views/subjects.html'
    })
    .state('all subjects', {
      url: '/edit/subjects',
      templateUrl: 'lex/views/edit/subject.html',
      resolve: {
        loggedin: checkLoggedin
      }
    })
    .state('exercises by subject', {
      url: '/edit/:modelName/:subjectName/exercises',
      templateUrl: 'lex/views/edit/exercise.html',
      resolve: {
        loggedin: checkLoggedin
      }
    })
  }
]);
