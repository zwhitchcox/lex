'use strict';

angular.module('mean.algos').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('algos', {
      url: '/algos',
      templateUrl: 'algos/views/index.html'
    });
  }
]);
