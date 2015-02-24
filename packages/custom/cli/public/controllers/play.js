'use strict';

angular.module('mean.cli').controller('CLIExerciseController', ['$scope',
'$stateParams', '$location', 'Global', 'CLI', 'Subject',
  function($scope, $stateParams, $location, Global, Challenge, Subject) {
    $scope.global = Global;
      $scope.processCmd = function(cmd,term) {
          window.prompt('hello')
          term.echo('hello')
      }
      $scope.greetings = 'hello'
      $scope.subject = $stateParams.subjectName
    }
]);
