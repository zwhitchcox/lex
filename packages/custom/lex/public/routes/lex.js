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

    var noHomo = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/api/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') {
          $timeout(deferred.reject);
          $location.url('/subjects');
        }

        // Not Authenticated
        else {
          $timeout(deferred.resolve);

        }
      });
    }


    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'lex/views/home.html',
      resolve: {
        goHome: noHomo
      }
    })
    .state('subjects', {
      url: '/subjects',
      templateUrl: 'lex/views/subjects.html'
    })
    .state('all subjects', {
      url: '/edit/subjects',
      templateUrl: 'lex/views/edit/subjects.html',
      resolve: {
        loggedin: checkLoggedin
      }
    })
    .state('exercises by subject', {
      url: '/edit/:modelName/:subjectName/exercises',
      templateUrl: 'lex/views/edit/exercises.html',
      resolve: {
        loggedin: checkLoggedin
      }
    })
    .state('test', {
      url: '/test',
      templateUrl: 'lex/views/test.html',
      resolve: {
        loggedin: checkLoggedin
      }
    })
  }
]);
