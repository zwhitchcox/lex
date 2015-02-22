'use strict';

angular.module('mean.langs').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('langs', {
      url: '/langs',
      templateUrl: 'langs/views/index.html'
    });
  }
]);
