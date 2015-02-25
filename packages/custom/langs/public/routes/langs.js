'use strict';

angular.module('mean.langs').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('langs example page', {
      url: '/langs/example',
      templateUrl: 'langs/views/index.html'
    });
  }
]);
