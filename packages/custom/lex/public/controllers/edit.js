'use strict';

angular.module('mean.lex').controller('EditController', ['$scope', '$stateParams',
  '$location', 'Global', 'Subject','Exercises','Module', 'SubjectHelper','$resource',
  '$rootScope',
  function($scope, $stateParams, $location, Global, Subject, Exercises,
      Module, SubjectHelper,$resource,$rootScope) {
    $scope.global = Global;
    $scope.hasAuthorization = function(subject) {
      if (!subject || !subject.user) return false;
      return $scope.global.isAdmin;
    };

    $scope.setDragging = function(dragon) {
      $scope.dragging = dragon
    }

    $scope.insert = function(droppedOn,subject) {
      subject.modules.splice(droppedOn,0,subject.modules[$scope.dragging])
      if ($scope.dragging>droppedOn) {
        subject.modules.splice($scope.dragging+1,1)
      } else {
        subject.modules.splice($scope.dragging,1)
      }
      subject.$update()
    }

    $rootScope.show
    $scope.changeShow = function(idx) {
      if ($scope.show===-2) return $scope.show++
      $scope.show=idx
    }

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
        $location.path('edit/subjects');
      });
    };
    $scope.removeExercise = function(exercise) {
      exercise.$remove($scope.getExercises)
    }

    $scope.update = function(subject) {
      subject.$update();
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
    $scope.removeModule = function(idx,subject) {
      subject.modules.splice(idx,1)
      subject.$update()
    }
    $scope.newModule= []

    $scope.addModule = function(idx,subject) {
        subject.modules.push($scope.newModule[idx])
        subject.$update(function(){
          $scope.newModule[idx] = ''
          $scope.find()
        })
    }
    $scope.subjectType = $stateParams.modelName
    $scope.subjectName = $stateParams.subjectName
  }
]);
