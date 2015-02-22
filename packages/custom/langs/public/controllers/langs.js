'use strict';

/* jshint -W098 */
angular.module('mean.langs').controller('LangsController', ['$scope', 'Global', 'Langs',
  function($scope, Global, Langs) {
    $scope.global = Global;
    $scope.package = {
      name: 'langs'
    };
  }
]);
