'use strict';

angular.module('mean.cli').config(['$stateProvider', ($stateProvider) ->

    checkLoggedin = ($q, $timeout, $http, $location) ->
      deferred = $q.defer();
      $http.get('/api/loggedin').success((user) ->
        if user != '0'
          $timeout(deferred.resolve)
        else
          $timeout(deferred.reject)
          $location.url('/auth/login')
      )
      return deferred.promise;

    $stateProvider
      .state('cli',
        url: '/cli/:subjectName',
        templateUrl: 'cli/views/play.html'
      )
      .state('create cli exercise',
        url: '/edit/cli/:subjectName/create',
        templateUrl: 'cli/views/create.html',
        resolve:
          loggedin: checkLoggedin
      )
      .state('edit cli exercise',
        url: '/edit/cli/:exerciseId',
        templateUrl: 'cli/views/edit.html',
        resolve:
          loggedin: checkLoggedin
      )
      .state('test',
        url: '/test',
        templateUrl: 'cli/views/test.html',
        resolve:
          loggedin: checkLoggedin
      )
])
