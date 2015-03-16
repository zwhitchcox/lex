'use strict';

angular.module('mean.regex').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('regex', {
      url: '/regex',
      templateUrl: 'regex/views/index.html'
    });
  }
]);
