'use strict';
angular.module('mean.lex').controller('EditController', [
  '$scope', '$stateParams', '$location', 'Global', 'Subject', 'Exercises', 'Module', 'SubjectHelper', '$resource', '$rootScope', function($scope, $stateParams, $location, Global, Subject, Exercises, Module, SubjectHelper, $resource, $rootScope) {
    $scope.global = Global;
    $scope.setDragging = function(dragon) {
      return $scope.dragging = dragon;
    };
    $scope.insert = function(droppedOn, subject) {
      subject.modules.splice(droppedOn, 0, subject.modules[$scope.dragging]);
      if ($scope.dragging > droppedOn) {
        subject.modules.splice($scope.dragging + 1, 1);
      } else {
        subject.modules.splice($scope.dragging, 1);
      }
      return subject.$update();
    };
    $rootScope.show;
    $scope.changeShow = function(idx) {
      if ($scope.show === -2) {
        return $scope.show++;
      }
      return $scope.show = idx;
    };
    $scope.create = function() {
      var subject;
      subject = new Subject({
        name: $scope.newName,
        type: $scope.newType
      });
      subject.$save(function(response) {
        return $scope.find();
      });
      $scope.newTitle = '';
      return $scope.newContent = '';
    };
    $scope.remove = function(subject) {
      return subject.$remove(function(response) {
        var i, j, len, ref, subj;
        ref = $scope.subjects;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          subj = ref[i];
          if (subj.name === subject.name) {
            $scope.subjects.splice(i, 1);
          }
        }
        return $location.path('edit/subjects');
      });
    };
    $scope.removeExercise = function(exercise) {
      return Exercises["delete"]({
        modelName: $stateParams.modelName,
        subjectName: $stateParams.subjectName,
        exerciseId: exercise._id
      }, $scope.getExercises);
    };
    $scope.update = function(subject) {
      return subject.$update();
    };
    $scope.find = function() {
      return Subject.query(function(subjects) {
        return $scope.subjects = subjects;
      });
    };
    $scope.findOne = function() {
      return Subject.get({
        subjectId: $stateParams.subjectId
      }, function(subject) {
        return $scope.subject = subject;
      });
    };
    $scope.getExercises = function() {
      return Exercises.query({
        subjectName: $stateParams.subjectName,
        modelName: $stateParams.modelName
      }, function(modules) {
        return $scope.modules = modules;
      });
    };
    $scope.removeModule = function(idx, subject) {
      subject.modules.splice(idx, 1);
      return subject.$update();
    };
    $scope.newModule = [];
    $scope.userModules = window.user.modules;
    $scope.addModule = function(idx, subject) {
      subject.modules.push($scope.newModule[idx]);
      subject.$update(function() {});
      $scope.newModule[idx] = '';
      return $scope.find();
    };
    $scope.clear = function(subject) {
      return $resource('/api/clear/:subjectName')["delete"]({
        subjectName: subject
      }, function(sent) {
        if (sent.status === 'saved') {
          window.user.modules[subject] = [];
          return $scope.userModules[subject] = window.user.modules[subject];
        }
      });
    };
    $scope.subjectType = $stateParams.modelName;
    return $scope.subjectName = $stateParams.subjectName;
  }
]);
