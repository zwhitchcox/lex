'use strict';

/* jshint -W098 */
angular.module('mean.lex').controller('LexController', ['$scope', 'Global', 'Lex',
  function($scope, Global, Lex) {
    $scope.global = Global;
    $scope.package = {
      name: 'lex'
    };
  }
]);
