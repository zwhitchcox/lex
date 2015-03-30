'use strict';
angular.module('mean.algos', ['ngSanitize']).controller('AlgosCtrl', [
  '$scope', 'Global', '$rootScope', 'Exercises', '$resource', function($scope, Global, $rootScope, Exercises, $resource) {
    var checkSolution, editor, play, randEx, showOutput;
    $scope.global = Global;
    $scope.change = function() {
      return $scope.code = 'hello';
    };
    $scope.choose = function(mod) {
      $scope.showModules = false;
      editor.resize();
      editor.renderer.updateFull();
      return play(mod);
    };
    play = function(mod) {
      $scope.curMod = mod;
      $scope.curEx = randEx();
      return editor.setValue($scope.curEx.start, 1);
    };
    randEx = function() {
      return $scope.curMod.exercises[Math.floor(Math.random() * $scope.curMod.exercises.length)];
    };
    $scope.init = function() {
      $scope.showModules = true;
      Exercises.query({
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
        return play($scope.modules[0]);
      });
      $scope.editorClass = 'col-md-12';
      $scope.outputClass = 'hide';
      return $scope.solClass = 'hide';
    };
    showOutput = function() {
      $scope.editorClass = 'col-md-6';
      $scope.outputClass = 'col-md-6';
      return $scope.solClass = 'hide';
    };
    $scope.sol = function() {
      $scope.editorClass = 'col-md-6';
      $scope.outputClass = 'hide';
      return $scope.solClass = 'col-md-6';
    };
    $scope.hideOutput = function() {
      $scope.editorClass = 'col-md-12';
      return $scope.outputClass = 'hide';
    };
    $scope.runit = function() {
      return $resource('api/interpret/:lang/:code').get({
        lang: 'py',
        code: $scope.code
      }, function(result) {
        $scope.output = result.output;
        return showOutput();
      });
    };
    checkSolution = function(ans) {};
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
