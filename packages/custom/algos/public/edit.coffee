'use strict';

angular.module('mean.cli').controller('AlgosExerciseEditController', ['$scope',
'$stateParams', '$location', 'Global', 'Algos', 'Subject','$resource'
  ($scope, $stateParams, $location, Global, Algos, Subject,$resource) ->
    $scope.global = Global;
    $scope.exercise = {}
    $scope.hasAuthorization = (challenge) ->
      return false if (!challenge || !challenge.user)
      return $scope.global.isAdmin || challenge.user._id == $scope.global.user._id;

    $scope.val = () ->
      return RegExp($scope.exercise.check).test($scope.exercise.sample)

    $scope.create = () ->
      exercise = new Algos(
        subject: $scope.exercise.subject._id,
        module: $scope.exercise.module,
        challenge: $scope.exercise.challenge,
        check: $scope.exercise.check,
        start: $scope.exercise.sample,
        solution: $scope.exercise.solution,
        name: $scope.exercise.name
      )
      exercise.$save((response) ->
        $location.path("edit/algos/#{$stateParams.subjectName}/exercises");
      )

    $scope.update = () ->
      $scope.exercise.$update((response) ->
        $scope.findOne()
        $location.path('edit/algos/' + response._id)
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

    $scope.findOne = () ->
      Algos.get({
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
