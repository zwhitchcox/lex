'use strict';
angular.module('mean.algos',['ngSanitize']).controller('AlgosCtrl', ['$scope', 'Global','$rootScope',
  'Exercises', '$resource', ($scope, Global,$rootScope, Exercises, $resource) ->
    $scope.global = Global
    $scope.change = () ->
      $scope.code = 'hello'

    $scope.choose = (mod) ->
      $scope.showModules = false
      editor.resize()
      editor.renderer.updateFull()
      play(mod)

    play = (mod) ->
      $scope.curMod = mod
      $scope.curEx = randEx()
      editor.setValue($scope.curEx.start,1)

    randEx = () ->
      $scope.curMod.exercises[Math.floor(Math.random()*$scope.curMod.exercises.length)]

    $scope.init = () ->
      $scope.showModules = true
      Exercises.query(
          subjectName: 'Algorithms',
          modelName: 'algos'
      , (modules) ->
        $scope.modules = modules
        if !window.user.modules?
          window.user.modules = {git:[],unix:[],dos:[],algos:[]}
        play($scope.modules[0])
      )
      $scope.editorClass = 'col-md-12'
      $scope.outputClass = 'hide'
      $scope.solClass = 'hide'


    showOutput = () ->
      $scope.editorClass = 'col-md-6'
      $scope.outputClass = 'col-md-6'
      $scope.solClass    = 'hide'

    $scope.sol = () ->
      $scope.editorClass = 'col-md-6'
      $scope.outputClass = 'hide'
      $scope.solClass    = 'col-md-6'


    $scope.hideOutput = () ->
      $scope.editorClass = 'col-md-12'
      $scope.outputClass = 'hide'

    $scope.runit = () ->
       $resource('api/interpret/:lang/:code')
         .get({
           lang: 'py',
           code:  $scope.code
         },(result)->
           $scope.output = result.output
           showOutput()
        )

    checkSolution = (ans) ->



    editor = ace.edit("editor")
    editor.setValue($scope.code,1)
    editor.getSession().setMode("ace/mode/python")
    editor.setTheme("ace/theme/eclipse");
    editor.setKeyboardHandler("ace/keyboard/vim")
    editor.getSession().on('change', ()->
      angular.element($('#Ctrl')).scope().code = editor.getSession().getValue()
    )
    $('#editor').css('height',window.innerHeight - $(".navbar").height()-70)
    $('#solution').css('height',window.innerHeight - $(".navbar").height()-70)
    window.onresize = () ->
      $('#editor').css('height',window.innerHeight - $(".navbar").height()-70)
      $('#solution').css('height',window.innerHeight - $(".navbar").height()-70)
])
