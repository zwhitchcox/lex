'use strict';
angular.module('mean.algos').controller('AlgosCtrl', ['$scope', 'Global','$rootScope'
  ($scope, Global,$rootScope) ->
    $scope.global = Global
    outf = (text) ->
      ctrl = angular.element($('[ng-controller="AlgosCtrl"]'))
      ctrl.scope().output.push text
      console.log(ctrl.scope().output)

    builtinRead = (x) ->
      if Sk.builtinFiles == undefined || Sk.builtinFiles["files"][x] == undefined
        throw "File not found: '#{x}'"
      return Sk.builtinFiles["files"][x]

    $scope.code =
    """
      import turtle

      t = turtle.Turtle()
      t.forward(100)

      print "Hello World"
    """

    $scope.runit = () ->
      $scope.output = []
      Sk.canvas = "mycanvas"
      Sk.pre = "output"
      Sk.configure({output:outf, read:builtinRead})
      eval Sk.importMainWithBody("<stdin>",false,$scope.code)
      console.log $scope.output
])
