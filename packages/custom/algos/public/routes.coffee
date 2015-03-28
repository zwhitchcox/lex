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
      .state('algos',
        url: '/algos/:subjectName',
        templateUrl: 'algos/views/play.html'
      )
      .state('create algo exercise',
        url: '/edit/algos/:subjectName/create',
        templateUrl: 'algos/views/create.html',
        resolve:
          loggedin: checkLoggedin
      )
      .state('edit algo exercise',
        url: '/edit/algos/:exerciseId',
        templateUrl: 'algos/views/edit.html',
        resolve:
          loggedin: checkLoggedin
      )
])
