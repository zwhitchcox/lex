'use strict';

angular.module('mean.lex', ['mean.system']).config(['$stateProvider', '$viewPathProvider',
  function($stateProvider, $viewPathProvider) {
    $viewPathProvider.override('system/views/index.html', 'lex/views/index.html');

    $stateProvider.state('lex example page', {
      url: '/lex/example',
      templateUrl: 'lex/views/index.html'
    });
  }
]);
