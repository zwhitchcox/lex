'use strict';
angular.module('mean.cli').controller('CLIExerciseEditController', [
  '$scope', '$stateParams', '$location', 'Global', 'CLI', 'Subject', '$resource', function($scope, $stateParams, $location, Global, CLI, Subject, $resource) {
    $scope.global = Global;
    $scope.exercise = {};
    $scope.hasAuthorization = function(challenge) {
      if (!challenge || !challenge.user) {
        return false;
      }
      return $scope.global.isAdmin || challenge.user._id === $scope.global.user._id;
    };
    $scope.val = function() {
      return RegExp($scope.exercise.check).test($scope.exercise.sample);
    };
    $scope.create = function() {
      var exercise;
      exercise = new CLI({
        subject: $scope.exercise.subject._id,
        module: $scope.exercise.module,
        challenge: $scope.exercise.challenge,
        output: $scope.exercise.output,
        check: $scope.exercise.check,
        sample: $scope.exercise.sample,
        next: $scope.exercise.next,
        prev: $scope.exercise.prev
      });
      return exercise.$save(function(response) {
        return $location.path("edit/cli/" + $stateParams.subjectName + "/exercises");
      });
    };
    $scope.update = function() {
      return $scope.exercise.$update(function(response) {
        $scope.findOne();
        return $location.path('edit/cli/' + response._id);
      });
    };
    $scope.findSubjects = function() {
      return Subject.query(function(subjects) {
        $scope.subjects = subjects;
        if ($stateParams.subjectName != null) {
          return $scope.subjects.forEach(function(cur) {
            if (cur.name.toLowerCase() === $stateParams.subjectName) {
              return $scope.exercise.subject = cur;
            }
          });
        }
      });
    };
    $scope.$watch('exercise.module', function() {
      return $resource('api/model/cli/:subjectName/:moduleName/exercises').query({
        subjectName: $scope.exercise.subject.name,
        moduleName: $scope.exercise.module
      }, function(result) {
        return $scope.nextEx = result;
      });
    });
    return $scope.findOne = function() {
      return CLI.get({
        exerciseId: $stateParams.exerciseId
      }, function(exercise) {
        $scope.exercise = exercise;
        $scope.subjects.forEach(function(cur) {
          if (cur._id === $scope.exercise.subject._id) {
            return $scope.exercise.subject = cur;
          }
        });
        return $scope.exercise.module = $scope.exercise.subject.modules[$scope.exercise.subject.modules.indexOf(exercise.module)];
      });
    };
  }
]);
