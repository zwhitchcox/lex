'use strict';
angular.module('mean.algos',['ngSanitize','ui.bootstrap']).controller('AlgosCtrl', ['$scope', 'Global','$rootScope',
  'Exercises', '$resource', 'Module','$modal', ($scope, Global,$rootScope, Exercises, $resource, Module,$modal) ->
    $scope.global = Global
    $scope.vid = () ->
      if $scope.curEx.vEnd?
        url = "//www.youtube.com/embed/#{$scope.curEx.vid}?start=#{$scope.curEx.vStart}&end=#{$scope.curEx.vEnd}"
      else if $scope.curEx.vStart?
        url = "//www.youtube.com/embed/#{$scope.curEx.vid}?start=#{$scope.curEx.vStart}"
      else
        url = "//www.youtube.com/embed/#{$scope.curEx.vid}"
      modalInstance = $modal.open
        template:
          """
            <style>
              iframe {
                margin-top:4px;
              }
            </style>
            <center>
            <iframe width="590" height="332"
            src="#{url}"
            frameborder="0" allowfullscreen>
            </iframe>
            </center>
          """
        controller: ($scope, $modalInstance) ->
          $scope.close =  () ->
            $modalInstance.dismiss()

    $scope.closeVid = () ->
      $modalInstance.dismiss('cancel')

    $scope.choose = (ex) ->
      $scope.curEx = $.extend(true, {}, ex)
      $scope.refreshEx = $.extend(true, {}, ex)
      $scope.solShown = false
      editor.setValue($scope.curEx.start,1)
      $scope.showEx()
      $scope.solOn = false
      editor.focus()
      $('#solution').html('')
      $('#solution').html($scope.curEx.solution)
      $('#solution').removeClass('prettyprinted')
      prettyPrint()


    $scope.ref = () ->
      $scope.curEx = $.extend(true, {}, $scope.refreshEx)
      $scope.solShown = false
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

    $scope.doneTest = (exid) ->
      if ~window.user.modules.algos.indexOf(exid)
        return 'done'
      else return ''

    $scope.setMod = (mod) ->
      $scope.curMod = mod

    $scope.mod = () ->
      $scope.modulesClass = 'col-xs-6'
      $scope.editorClass  = 'hide'
      $scope.outputClass  = 'hide'
      $scope.solClass     = 'hide'
      $scope.btmClass     = 'hide'

    $scope.showEx = () ->
      $scope.modulesClass = 'hide'
      $scope.editorClass  = 'col-xs-12'
      $scope.outputClass  = 'hide'
      $scope.solClass     = 'hide'
      $scope.btmClass     = 'btm'

    $scope.sol = () ->
      $scope.solShown = true
      if $scope.solClass != 'col-xs-6'
        $scope.editorClass = 'col-xs-6'
        $scope.solClass    = 'col-xs-6'
        $scope.outputClass = 'hide'
      else
        $scope.editorClass = 'col-xs-12'
        $scope.solClass    = 'hide'

    $scope.hideOutput = () ->
      $scope.editorClass = 'col-xs-12'
      $scope.outputClass = 'hide'

    $scope.run = () ->
      $resource('api/interpret/:lang/:code')
        .get({
          lang: 'py',
          code:  $scope.code
        },(result)->
          $scope.output = result.output
          $scope.editorClass = 'col-xs-6'
          $scope.outputClass = 'col-xs-6'
          $scope.solClass    = 'hide'
          $scope.solOn       = false
          try
            if window.eval.call(window,'(function (el) {'+$scope.curEx.check+'})')($scope.output)
              if !$scope.solShown and ($scope.doneTest($scope.curEx._id) != 'done')
                Module.get({
                  subjectName: 'algos',
                  moduleName: $scope.curEx._id
                })
                window.user.modules.algos.push($scope.curEx._id)
              return $scope.outputStatusClass = 'bg-success'
            else
              return $scope.outputStatusClass =  'bg-danger'
          catch error
            console.log error
            return $scope.outputStatusClass = 'bg-danger'

      )
    window.onkeydown = (event) ->
      if $scope.editorClass != 'hide' and (event.which == 83 and (event.metaKey or event.ctrlKey))
        event.preventDefault()
        $scope.$apply $scope.sol()
      else if $scope.editorClass != 'hide' and (event.which == 82 and (event.metaKey or event.ctrlKey))
        event.preventDefault()
        $scope.$apply $scope.ref()
      else if $scope.editorClass != 'hide' and (event.which == 77 and (event.metaKey or event.ctrlKey))
        event.preventDefault()
        $scope.$apply $scope.mod()
      else if $scope.editorClass != 'hide' and (event.which == 79 and (event.metaKey or event.ctrlKey))
        event.preventDefault()
        $scope.$apply $scope.run()
      else if $scope.editorClass == 'hide' and (event.which - 48 >= 0 and event.which - 48 <= 9) and $scope.curMod == undefined
        $scope.$apply $scope.curMod = $scope.modules[event.which-49]
        event.preventDefault()
      else if $scope.editorClass == 'hide' and (event.which - 48 >= 0 and event.which - 48 <= 9) and $scope.curMod != undefined
        if $scope.curMod.exercises[event.which-49]?
          $scope.choose($scope.curMod.exercises[event.which-49])
        $scope.$apply()
        event.preventDefault()
    editor = ace.edit("editor")
    editor.setValue($scope.code,1)
    editor.getSession().setMode("ace/mode/python")
    editor.setOption("wrap", true)
    editor.setTheme("ace/theme/eclipse");
    editor.setKeyboardHandler("ace/keyboard/vim")
    editor.getSession().on('change', ()->
      angular.element($('#Ctrl')).scope().code = editor.getSession().getValue()
      editor.resize()
    )
    $('#editor').css('height',window.innerHeight - $(".navbar").height()-70)
    $('pre').css('height',window.innerHeight - $(".navbar").height()-70)
    $('pre').css('overflow-y','scroll')
    window.onresize = () ->
      $('#editor').css('height',window.innerHeight - $(".navbar").height()-70)
      $('pre').css('height',window.innerHeight - $(".navbar").height()-70)
])
