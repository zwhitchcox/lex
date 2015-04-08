'use strict';
angular.module('mean.algos',['ngSanitize','ui.bootstrap']).controller('AlgosCtrl', ['$scope', 'Global','$rootScope',
  'Exercises', '$resource', 'Module', ($scope, Global,$rootScope, Exercises, $resource, Module) ->
    $scope.global = Global

    $scope.choose = (ex) ->
      $scope.curEx = $.extend(true, {}, ex)
      $scope.refreshEx = $.extend(true, {}, ex)
      editor.setValue($scope.curEx.start,1)
      $scope.showEx()
      editor.focus()


    $scope.ref = () ->
      $scope.curEx = $.extend(true, {}, $scope.refreshEx)
      editor.setValue($scope.curEx.start,1)
      $scope.showEx()

    $scope.init = () ->
      Exercises.query(
          subjectName: 'Algorithms',
          modelName: 'algos'
      , (modules) ->
        $scope.modules = modules
        if !window.user.modules?
          window.user.modules = {git:[],unix:[],dos:[],algos:[]}
        $scope.mod()
        $scope.solOn       = false
        $scope.solShown    = false

      )

    $scope.setMod = (mod) ->
      $scope.curMod = mod

    $scope.mod = () ->
      $scope.modulesClass = 'col-md-6'
      $scope.editorClass  = 'hide'
      $scope.outputClass  = 'hide'
      $scope.solClass     = 'hide'
      $scope.btmClass     = 'hide'

    $scope.showEx = () ->
      $scope.modulesClass = 'hide'
      $scope.editorClass  = 'col-md-12'
      $scope.outputClass  = 'hide'
      $scope.solClass     = 'hide'
      $scope.btmClass     = 'btm'

    $scope.sol = () ->
      $scope.solShown = true
      if $scope.solOn
        $scope.editorClass = 'col-md-12'
        $scope.solClass    = 'hide'
        $scope.solOn = false
      else
        $scope.editorClass = 'col-md-6'
        $scope.solClass    = 'col-md-6'
        $scope.solOn = true
        $scope.outputClass = 'hide'
      prettyPrint()


    $scope.hideOutput = () ->
      $scope.editorClass = 'col-md-12'
      $scope.outputClass = 'hide'

    $scope.run = () ->
      $resource('api/interpret/:lang/:code')
        .get({
          lang: 'py',
          code:  $scope.code
        },(result)->
          $scope.output = result.output
          $scope.editorClass = 'col-md-6'
          $scope.outputClass = 'col-md-6'
          $scope.solClass    = 'hide'
          $scope.solOn       = false
          try
            if window.eval.call(window,'(function (el) {'+$scope.curEx.check+'})')($scope.output)
              if !$scope.shown
                Module.get({
                  subjectName: 'Algorithms',
                  moduleName: $scope.curEx._id
                })
              return $scope.outputStatusClass = 'bg-success'
            else
              return $scope.outputStatusClass =  'bg-danger'
          catch error
              return $scope.outputStatusClass = 'bg-danger'

      )

    window.onkeydown = (event) ->
      if $scope.editorClass != 'hide' and (event.which == 83 and (event.metaKey or event.ctrlKey))
        event.preventDefault()
        $scope.$apply($scope.sol())
      if $scope.editorClass != 'hide' and (event.which == 82 and (event.metaKey or event.ctrlKey))
        event.preventDefault()
        $scope.$apply($scope.ref())
      if $scope.editorClass != 'hide' and (event.which == 77 and (event.metaKey or event.ctrlKey))
        event.preventDefault()
        $scope.$apply($scope.mod())
      if $scope.editorClass != 'hide' and (event.which == 79 and (event.metaKey or event.ctrlKey))
        event.preventDefault()
        $scope.$apply($scope.run())

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
