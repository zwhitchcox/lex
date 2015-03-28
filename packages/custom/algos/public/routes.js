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
    return $stateProvider.state('algos', {
      url: '/algos/:subjectName',
      templateUrl: 'algos/views/play.html'
    }).state('create algo exercise', {
      url: '/edit/algos/:subjectName/create',
      templateUrl: 'algos/views/create.html',
      resolve: {
        loggedin: checkLoggedin
      }
    }).state('edit algo exercise', {
      url: '/edit/algos/:exerciseId',
      templateUrl: 'algos/views/edit.html',
      resolve: {
        loggedin: checkLoggedin
      }
    });
  }
]);
