'use strict'

angular.module('mean.lex').config(['$stateProvider',
  ($stateProvider) ->

    checkLoggedin = ($q, $timeout, $http, $location) ->
      deferred = $q.defer();

      $http.get('/api/loggedin').success((user) ->
        if user != '0'
          $timeout(deferred.resolve)
        else
          $timeout(deferred.reject)
          $location.url('/auth/login')
      )

    noHomo = ($q, $timeout, $http, $location) ->
      deferred = $q.defer();

      $http.get('/api/loggedin').success((user)
        if (user != '0')
          $timeout(deferred.reject)
          $location.url('/subjects')
        else
          $timeout(deferred.resolve)
      )
    $stateProvider
    .state('progress',
      url: '/prog',
      templateUrl: 'lex/views/progress.html',
      resolve:
        loggedin: checkLoggedin
    )
    .state('home',
      url: '/',
      templateUrl: 'lex/views/home.html',
      resolve:
        goHome: noHomo
    )
    .state('subjects',
      url: '/subjects',
      templateUrl: 'lex/views/subjects.html'
    )
    .state('all subjects',
      url: '/edit/subjects',
      templateUrl: 'lex/views/edit/subjects.html',
      resolve:
        loggedin: checkLoggedin
    )
    .state('exercises by subject',
      url: '/edit/:modelName/:subjectName/exercises',
      templateUrl: 'lex/views/edit/exercises.html',
      resolve:
        loggedin: checkLoggedin
    )

])
