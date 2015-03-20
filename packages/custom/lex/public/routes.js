'use strict';
angular.module('mean.lex').config([
  '$stateProvider', function($stateProvider) {
    var checkLoggedin, noHomo;
    checkLoggedin = function($q, $timeout, $http, $location) {
      var deferred;
      deferred = $q.defer();
      return $http.get('/api/loggedin').success(function(user) {
        if (user !== '0') {
          return $timeout(deferred.resolve);
        } else {
          $timeout(deferred.reject);
          return $location.url('/auth/login');
        }
      });
    };
    noHomo = function($q, $timeout, $http, $location) {
      var deferred;
      deferred = $q.defer();
      return $http.get('/api/loggedin').success(user, user !== '0' ? ($timeout(deferred.reject), $location.url('/subjects')) : $timeout(deferred.resolve));
    };
    return $stateProvider.state('progress', {
      url: '/prog',
      templateUrl: 'lex/views/progress.html',
      resolve: {
        loggedin: checkLoggedin
      }
    }).state('home', {
      url: '/',
      templateUrl: 'lex/views/home.html',
      resolve: {
        goHome: noHomo
      }
    }).state('subjects', {
      url: '/subjects',
      templateUrl: 'lex/views/subjects.html'
    }).state('all subjects', {
      url: '/edit/subjects',
      templateUrl: 'lex/views/edit/subjects.html',
      resolve: {
        loggedin: checkLoggedin
      }
    }).state('exercises by subject', {
      url: '/edit/:modelName/:subjectName/exercises',
      templateUrl: 'lex/views/edit/exercises.html',
      resolve: {
        loggedin: checkLoggedin
      }
    });
  }
]);
