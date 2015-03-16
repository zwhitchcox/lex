'use strict';
angular.module('mean.cli').config([
  '$stateProvider', function($stateProvider) {
    var checkLoggedin;
    checkLoggedin = function($q, $timeout, $http, $location) {
      var deferred;
      deferred = $q.defer();
      $http.get('/api/loggedin').success(function(user) {
        if (user !== '0') {
          return $timeout(deferred.resolve);
        } else {
          $timeout(deferred.reject);
          return $location.url('/auth/login');
        }
      });
      return deferred.promise;
    };
    return $stateProvider.state('cli', {
      url: '/cli/:subjectName',
      templateUrl: 'cli/views/play.html'
    }).state('create cli exercise', {
      url: '/edit/cli/:subjectName/create',
      templateUrl: 'cli/views/create.html',
      resolve: {
        loggedin: checkLoggedin
      }
    }).state('edit cli exercise', {
      url: '/edit/cli/:exerciseId',
      templateUrl: 'cli/views/edit.html',
      resolve: {
        loggedin: checkLoggedin
      }
    }).state('test', {
      url: '/test',
      templateUrl: 'cli/views/test.html',
      resolve: {
        loggedin: checkLoggedin
      }
    });
  }
]);
