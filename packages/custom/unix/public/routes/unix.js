'use strict';

angular.module('mean.unix').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('unix example page', {
      url: '/unix/example',
      templateUrl: 'unix/views/index.html'
    });
  }
]);
