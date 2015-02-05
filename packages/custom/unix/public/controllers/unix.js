'use strict';

/* jshint -W098 */
angular.module('mean.unix').controller('UnixController', ['$scope', 'Global', 'Unix',
  function($scope, Global, Unix) {
    $scope.global = Global;
    $scope.package = {
      name: 'unix'
    };
  }
]);
