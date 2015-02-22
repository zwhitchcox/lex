'use strict';

angular.module('mean.algs').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('algs example page', {
      url: '/algs/example',
      templateUrl: 'algs/views/index.html'
    });
  }
]);
