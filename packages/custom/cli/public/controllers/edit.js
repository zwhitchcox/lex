'use strict';

angular.module('mean.cli').controller('CLIExerciseEditController', ['$scope',
'$stateParams', '$location', 'Global', 'CLI', 'Subject',
  function($scope, $stateParams, $location, Global, CLI, Subject) {
    $scope.global = Global;
    $scope.exercise = {}
    $scope.hasAuthorization = function(challenge) {
      if (!challenge || !challenge.user) return false;
      return $scope.global.isAdmin || challenge.user._id === $scope.global.user._id;
    };
    $scope.create = function() {
        var exercise = new CLI({
          subject: $scope.exercise.subject._id,
          module: $scope.exercise.module,
          challenge: $scope.exercise.challenge,
          output: $scope.exercise.output,
          solutions: $scope.exercise.solutions
        });
        exercise.$save(function(response) {
          $location.path('edit/cli/'+$stateParams.subjectName+'/exercises');
        });
    };

    $scope.update = function() {
      $scope.exercise.$update(function(response) {
        $scope.findOne()
        $location.path('edit/cli/' + response._id);
      });
    };

    $scope.findSubjects = function() {
      Subject.query(function(subjects) {
        $scope.subjects = subjects;
        if ($stateParams.subjectName) {
          $scope.subjects.forEach(function(cur) {
            if (cur.name.toLowerCase() === $stateParams.subjectName) {
              $scope.exercise.subject = cur
            }
          })
        }
      });
    };

    $scope.addSol = function() {
      if (!$scope.exercise.solutions) $scope.exercise.solutions = []
      if ($scope.newSolution === undefined) $scope.newSolution = ''
      $scope.exercise.solutions[$scope.exercise.solutions.length] = $scope.newSolution
      $scope.newSolution = ''

    }

    $scope.removeSol = function(index) {
      $scope.exercise.solutions.splice(index,1)
    }

    $scope.findOne = function() {
      CLI.get({
        exerciseId: $stateParams.exerciseId
      }, function(exercise) {
        $scope.exercise = exercise;
        $scope.subjects.forEach(function(cur) {
          if (cur._id == $scope.exercise.subject._id) {
            $scope.exercise.subject = cur
          }
        })
        $scope.exercise.module = $scope.exercise.subject.modules[
            $scope.exercise.subject.modules.indexOf(exercise.module)
          ]
      });
    };


  }
]);
