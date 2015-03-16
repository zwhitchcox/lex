'use strict';

/* jshint -W098 */
angular.module('mean.regex').controller('RegexController', ['$scope', 'Global', 'Regex',
  function($scope, Global, Regex) {
    $scope.global = Global;
    $scope.package = {
      name: 'regex'
    };
  }
]);
