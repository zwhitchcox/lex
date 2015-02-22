'use strict';

angular.module('mean.lex', ['DragAndDrop']).controller('EditController', ['$scope', '$stateParams',
  '$location', 'Global', 'Subject','Exercises','Module', 'SubjectHelper',
  function($scope, $stateParams, $location, Global, Subject, Exercises,
      Module, SubjectHelper) {
    $scope.global = Global;
    $scope.hasAuthorization = function(subject) {
      if (!subject || !subject.user) return false;
      return $scope.global.isAdmin;
    };

    $scope.create = function() {
      var subject = new Subject({
        name: $scope.newName,
        type: $scope.newType
      });
      subject.$save(function(response) {
        $scope.find()
      });

      $scope.newTitle = '';
      $scope.newContent = '';
    };

    $scope.remove = function(subject) {
      subject.$remove(function(response) {
        for (var i in $scope.subjects) {
          if ($scope.subjects[i] === subject) {
            $scope.subjects.splice(i,1);
          }
        }
        $location.path('subjects');
      });
    };

    $scope.update = function(subject) {
      subject.$update(function() {
        subject.modules = subject.modules.join(' ')
      });
    };

    $scope.find = function() {
      Subject.query(function(subjects) {
        $scope.subjects = subjects;
         $scope.subjectsByCategory = $.extend(true,{},SubjectHelper)
        $scope.subjects.forEach(function(subject) {
          $scope.subjectsByCategory[subject.type].subjects.push(subject)
        })
      });
    };

    $scope.findOne = function() {
      Subject.get({
        subjectId: $stateParams.subjectId
      }, function(subject) {
        $scope.subject = subject;
      });
    };

    $scope.getExercises = function() {
      Exercises.query({
          subjectName: $stateParams.subjectName,
          modelName: $stateParams.modelName
      }, function(exercises) {
        $scope.exercises = exercises;
      });
    }
    $scope.newModule= []
    $scope.addModule = function(idx,subject) {
      var newModule = new Module({name:$scope.newModule[idx]})
      newModule.$save(function(response){
        subject.modules = subject.modules.map(function(val) {
            return val._id
          })
        subject.modules.push(response._id)
        subject.$update(function(){
          $scope.find()
        })
      })

    }

    $scope.subjectType = $stateParams.modelName
    $scope.subjectName = $stateParams.subjectName
  }
]);
