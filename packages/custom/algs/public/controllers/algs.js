'use strict';

/* jshint -W098 */
angular.module('mean.algs').controller('AlgsController', ['$scope', 'Global', 'Algs',
  function($scope, Global, Algs) {
    $scope.global = Global;
    $scope.package = {
      name: 'algs'
    };
  }
]);
