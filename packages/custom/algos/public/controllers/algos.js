'use strict';
angular.module('mean.algos').controller('AlgosCtrl', [
  '$scope', 'Global', '$rootScope', function($scope, Global, $rootScope) {
    var builtinRead, outf;
    $scope.global = Global;
    outf = function(text) {
      var ctrl;
      ctrl = angular.element($('[ng-controller="AlgosCtrl"]'));
      ctrl.scope().output.push(text);
      return console.log(ctrl.scope().output);
    };
    builtinRead = function(x) {
      if (Sk.builtinFiles === void 0 || Sk.builtinFiles["files"][x] === void 0) {
        throw "File not found: '" + x + "'";
      }
      return Sk.builtinFiles["files"][x];
    };
    $scope.code = "import turtle\n\nt = turtle.Turtle()\nt.forward(100)\n\nprint \"Hello World\"";
    return $scope.runit = function() {
      $scope.output = [];
      Sk.canvas = "mycanvas";
      Sk.pre = "output";
      Sk.configure({
        output: outf,
        read: builtinRead
      });
      eval(Sk.importMainWithBody("<stdin>", false, $scope.code));
      return console.log($scope.output);
    };
  }
]);
