'use strict';
angular.module('mean.algos', ['ngSanitize', 'ui.bootstrap']).controller('AlgosCtrl', [
  '$scope', 'Global', '$rootScope', 'Exercises', '$resource', 'Module', function($scope, Global, $rootScope, Exercises, $resource, Module) {
    var editor;
    $scope.global = Global;
    $scope.choose = function(ex) {
      $scope.curEx = $.extend(true, {}, ex);
      $scope.refreshEx = $.extend(true, {}, ex);
      editor.setValue($scope.curEx.start, 1);
      $scope.showEx();
      return editor.focus();
    };
    $scope.ref = function() {
      $scope.curEx = $.extend(true, {}, $scope.refreshEx);
      editor.setValue($scope.curEx.start, 1);
      return $scope.showEx();
    };
    $scope.init = function() {
      return Exercises.query({
        subjectName: 'Algorithms',
        modelName: 'algos'
      }, function(modules) {
        $scope.modules = modules;
        if (window.user.modules == null) {
          window.user.modules = {
            git: [],
            unix: [],
            dos: [],
            algos: []
          };
        }
        $scope.mod();
        $scope.solOn = false;
        return $scope.solShown = false;
      });
    };
    $scope.setMod = function(mod) {
      return $scope.curMod = mod;
    };
    $scope.mod = function() {
      $scope.modulesClass = 'col-md-6';
      $scope.editorClass = 'hide';
      $scope.outputClass = 'hide';
      $scope.solClass = 'hide';
      return $scope.btmClass = 'hide';
    };
    $scope.showEx = function() {
      $scope.modulesClass = 'hide';
      $scope.editorClass = 'col-md-12';
      $scope.outputClass = 'hide';
      $scope.solClass = 'hide';
      return $scope.btmClass = 'btm';
    };
    $scope.sol = function() {
      $scope.solShown = true;
      if ($scope.solOn) {
        $scope.editorClass = 'col-md-12';
        $scope.solClass = 'hide';
        $scope.solOn = false;
      } else {
        $scope.editorClass = 'col-md-6';
        $scope.solClass = 'col-md-6';
        $scope.solOn = true;
        $scope.outputClass = 'hide';
      }
      return prettyPrint();
    };
    $scope.hideOutput = function() {
      $scope.editorClass = 'col-md-12';
      return $scope.outputClass = 'hide';
    };
    $scope.run = function() {
      return $resource('api/interpret/:lang/:code').get({
        lang: 'py',
        code: $scope.code
      }, function(result) {
        var error;
        $scope.output = result.output;
        $scope.editorClass = 'col-md-6';
        $scope.outputClass = 'col-md-6';
        $scope.solClass = 'hide';
        $scope.solOn = false;
        try {
          if (window["eval"].call(window, '(function (el) {' + $scope.curEx.check + '})')($scope.output)) {
            if (!$scope.shown) {
              Module.get({
                subjectName: 'Algorithms',
                moduleName: $scope.curEx._id
              });
            }
            return $scope.outputStatusClass = 'bg-success';
          } else {
            return $scope.outputStatusClass = 'bg-danger';
          }
        } catch (_error) {
          error = _error;
          return $scope.outputStatusClass = 'bg-danger';
        }
      });
    };
    window.onkeydown = function(event) {
      if ($scope.editorClass !== 'hide' && (event.which === 83 && (event.metaKey || event.ctrlKey))) {
        event.preventDefault();
        $scope.$apply($scope.sol());
      }
      if ($scope.editorClass !== 'hide' && (event.which === 82 && (event.metaKey || event.ctrlKey))) {
        event.preventDefault();
        $scope.$apply($scope.ref());
      }
      if ($scope.editorClass !== 'hide' && (event.which === 77 && (event.metaKey || event.ctrlKey))) {
        event.preventDefault();
        $scope.$apply($scope.mod());
      }
      if ($scope.editorClass !== 'hide' && (event.which === 79 && (event.metaKey || event.ctrlKey))) {
        event.preventDefault();
        return $scope.$apply($scope.run());
      }
    };
    editor = ace.edit("editor");
    editor.setValue($scope.code, 1);
    editor.getSession().setMode("ace/mode/python");
    editor.setTheme("ace/theme/eclipse");
    editor.setKeyboardHandler("ace/keyboard/vim");
    editor.getSession().on('change', function() {
      return angular.element($('#Ctrl')).scope().code = editor.getSession().getValue();
    });
    $('#editor').css('height', window.innerHeight - $(".navbar").height() - 70);
    $('#solution').css('height', window.innerHeight - $(".navbar").height() - 70);
    return window.onresize = function() {
      $('#editor').css('height', window.innerHeight - $(".navbar").height() - 70);
      return $('#solution').css('height', window.innerHeight - $(".navbar").height() - 70);
    };
  }
]);
