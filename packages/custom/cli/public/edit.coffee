'use strict';

angular.module('mean.cli').controller('CLIExerciseEditController', ['$scope',
'$stateParams', '$location', 'Global', 'CLI', 'Subject','$resource'
  ($scope, $stateParams, $location, Global, CLI, Subject,$resource) ->
    $scope.global = Global;
    $scope.exercise = {}
    $scope.hasAuthorization = (challenge) ->
      return false if (!challenge || !challenge.user)
      return $scope.global.isAdmin || challenge.user._id == $scope.global.user._id;

    $scope.val = () ->
      return RegExp($scope.exercise.solution).test($scope.exercise.sample)

    $scope.create = () ->
      exercise = new CLI(
        subject: $scope.exercise.subject._id,
        module: $scope.exercise.module,
        challenge: $scope.exercise.challenge,
        output: $scope.exercise.output,
        solution: $scope.exercise.solution,
        sample: $scope.exercise.sample,
        next: $scope.exercise.next
      )
      exercise.$save((response) ->
        $location.path("edit/cli/#{$stateParams.subjectName}/exercises");
      )

    $scope.update = () ->
      $scope.exercise.$update((response) ->
        $scope.findOne()
        $location.path('edit/cli/' + response._id)
      )

    $scope.findSubjects = () ->
      Subject.query((subjects) ->
        $scope.subjects = subjects
        if $stateParams.subjectName?
          $scope.subjects.forEach((cur) ->
            if (cur.name.toLowerCase() == $stateParams.subjectName)
              $scope.exercise.subject = cur
          )
      )

    $scope.$watch('exercise.module',()->
      $resource('api/model/cli/:subjectName/:moduleName/exercises')
        .query({
          subjectName: $scope.exercise.subject.name,
          moduleName:  $scope.exercise.module
        },(result)->$scope.nextEx = result)
    )

    $scope.findOne = () ->
      CLI.get({
        exerciseId: $stateParams.exerciseId
      }, (exercise)->
        $scope.exercise = exercise;
        $scope.subjects.forEach((cur) ->
          $scope.exercise.subject = cur if cur._id == $scope.exercise.subject._id
        )
        $scope.exercise.module =
          $scope.exercise.subject.modules[$scope.exercise.subject.modules.indexOf(exercise.module)]
      )
])
