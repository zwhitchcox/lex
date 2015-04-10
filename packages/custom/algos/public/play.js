'use strict';
angular.module('mean.algos', ['ngSanitize', 'ui.bootstrap']).controller('AlgosCtrl', [
  '$scope', 'Global', '$rootScope', 'Exercises', '$resource', 'Module', function($scope, Global, $rootScope, Exercises, $resource, Module) {
    var editor;
    $scope.global = Global;
    $scope.choose = function(ex) {
      $scope.curEx = $.extend(true, {}, ex);
      $scope.refreshEx = $.extend(true, {}, ex);
      $scope.solShown = false;
      editor.setValue($scope.curEx.start, 1);
      $scope.showEx();
      $scope.solOn = false;
      editor.focus();
      $('#solution').html('');
      $('#solution').html($scope.curEx.solution);
      $('#solution').removeClass('prettyprinted');
      return prettyPrint();
    };
    $scope.ref = function() {
      $scope.curEx = $.extend(true, {}, $scope.refreshEx);
      $scope.solShown = false;
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
    $scope.doneTest = function(exid) {
      if (~window.user.modules.algos.indexOf(exid)) {
        return 'done';
      } else {
        return '';
      }
    };
    $scope.setMod = function(mod) {
      return $scope.curMod = mod;
    };
    $scope.mod = function() {
      $scope.modulesClass = 'col-xs-6';
      $scope.editorClass = 'hide';
      $scope.outputClass = 'hide';
      $scope.solClass = 'hide';
      return $scope.btmClass = 'hide';
    };
    $scope.showEx = function() {
      $scope.modulesClass = 'hide';
      $scope.editorClass = 'col-xs-12';
      $scope.outputClass = 'hide';
      $scope.solClass = 'hide';
      return $scope.btmClass = 'btm';
    };
    $scope.sol = function() {
      $scope.solShown = true;
      if ($scope.solOn) {
        $scope.editorClass = 'col-xs-12';
        $scope.solClass = 'hide';
        return $scope.solOn = false;
      } else {
        $scope.editorClass = 'col-xs-6';
        $scope.solClass = 'col-xs-6';
        $scope.solOn = true;
        return $scope.outputClass = 'hide';
      }
    };
    $scope.hideOutput = function() {
      $scope.editorClass = 'col-xs-12';
      return $scope.outputClass = 'hide';
    };
    $scope.run = function() {
      return $resource('api/interpret/:lang/:code').get({
        lang: 'py',
        code: $scope.code
      }, function(result) {
        var error;
        $scope.output = result.output;
        $scope.editorClass = 'col-xs-6';
        $scope.outputClass = 'col-xs-6';
        $scope.solClass = 'hide';
        $scope.solOn = false;
        try {
          if (window["eval"].call(window, '(function (el) {' + $scope.curEx.check + '})')($scope.output)) {
            if (!$scope.solShown && (doneTest($scope.curEx._id) !== 'done')) {
              Module.get({
                subjectName: 'algos',
                moduleName: $scope.curEx._id
              });
              window.user.modules.algos.push($scope.curEx._id);
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
        return $scope.$apply($scope.sol());
      } else if ($scope.editorClass !== 'hide' && (event.which === 82 && (event.metaKey || event.ctrlKey))) {
        event.preventDefault();
        return $scope.$apply($scope.ref());
      } else if ($scope.editorClass !== 'hide' && (event.which === 77 && (event.metaKey || event.ctrlKey))) {
        event.preventDefault();
        return $scope.$apply($scope.mod());
      } else if ($scope.editorClass !== 'hide' && (event.which === 79 && (event.metaKey || event.ctrlKey))) {
        event.preventDefault();
        return $scope.$apply($scope.run());
      } else if ($scope.editorClass === 'hide' && (event.which - 48 >= 0 && event.which - 48 <= 9) && $scope.curMod === void 0) {
        $scope.$apply($scope.curMod = $scope.modules[event.which - 49]);
        return event.preventDefault();
      } else if ($scope.editorClass === 'hide' && (event.which - 48 >= 0 && event.which - 48 <= 9) && $scope.curMod !== void 0) {
        if ($scope.curMod.exercises[event.which - 49] != null) {
          $scope.choose($scope.curMod.exercises[event.which - 49]);
        }
        $scope.$apply();
        return event.preventDefault();
      }
    };
    editor = ace.edit("editor");
    editor.setValue($scope.code, 1);
    editor.getSession().setMode("ace/mode/python");
    editor.getSession().setUseWrapMode(true);
    editor.setTheme("ace/theme/eclipse");
    editor.setKeyboardHandler("ace/keyboard/vim");
    editor.getSession().on('change', function() {
      angular.element($('#Ctrl')).scope().code = editor.getSession().getValue();
      return editor.resize();
    });
    $('#editor').css('height', window.innerHeight - $(".navbar").height() - 70);
    $('#solution').css('height', window.innerHeight - $(".navbar").height() - 70);
    return window.onresize = function() {
      $('#editor').css('height', window.innerHeight - $(".navbar").height() - 70);
      return $('#solution').css('height', window.innerHeight - $(".navbar").height() - 70);
    };
  }
]);
