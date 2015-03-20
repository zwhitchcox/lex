'use strict';

angular.module('mean.lex').controller('EditController',['$scope','$stateParams',
  '$location', 'Global', 'Subject', 'Exercises', 'Module', 'SubjectHelper',
  '$resource', '$rootScope', ($scope, $stateParams, $location, Global, Subject, Exercises, Module, SubjectHelper,$resource,$rootScope) ->
    $scope.global = Global

    $scope.setDragging = (dragon) ->
      $scope.dragging = dragon

    $scope.insert = (droppedOn,subject) ->
      subject.modules.splice(droppedOn,0,subject.modules[$scope.dragging])
      if ($scope.dragging>droppedOn)
        subject.modules.splice($scope.dragging+1,1)
      else
        subject.modules.splice($scope.dragging,1)
      subject.$update()

    $rootScope.show
    $scope.changeShow = (idx) ->
      return $scope.show++ if ($scope.show==-2)
      $scope.show=idx

    $scope.create = () ->
      subject = new Subject(
        name: $scope.newName,
        type: $scope.newType
      )
      subject.$save((response) ->
        $scope.find()
      )
      $scope.newTitle = ''
      $scope.newContent = ''

    $scope.remove = (subject) ->
      subject.$remove (response) ->
        for subj,i in $scope.subjects
          $scope.subjects.splice i,1 if (subj.name == subject.name)
        $location.path 'edit/subjects'

    $scope.removeExercise = (exercise) ->
      Exercises.delete({
        modelName: $stateParams.modelName
        subjectName: $stateParams.subjectName
        exerciseId: exercise._id
        }, $scope.getExercises
      )

    $scope.update = (subject) ->
      subject.$update()

    $scope.find = () ->
      Subject.query (subjects) ->
        $scope.subjects = subjects

    $scope.findOne = () ->
      Subject.get subjectId: $stateParams.subjectId ,
        (subject) -> $scope.subject = subject

    $scope.getExercises = () ->
      Exercises.query
        subjectName: $stateParams.subjectName,
        modelName: $stateParams.modelName
        , (modules) ->
          $scope.modules = modules


    $scope.removeModule = (idx,subject) ->
      subject.modules.splice(idx,1)
      subject.$update()

    $scope.newModule= []
    $scope.userModules = window.user.modules
    $scope.addModule = (idx,subject) ->
      subject.modules.push $scope.newModule[idx]
      subject.$update () ->
      $scope.newModule[idx] = ''
      $scope.find()

    $scope.clear = (subject) ->
      $resource('/api/clear/:subjectName')
      .delete({subjectName:subject},(sent)->
        if sent.status == 'saved'
          window.user.modules[subject] = []
          $scope.userModules[subject] = window.user.modules[subject]
      )

    $scope.subjectType = $stateParams.modelName
    $scope.subjectName = $stateParams.subjectName
])
