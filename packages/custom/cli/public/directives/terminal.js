'use strict'

angular.module('mean.cli').directive('terminal', function() {
    return {
      template: '<div ng-class="termClass"></div>',
      replace: true,
      controller: function($scope,$rootScope,$element) {
        $scope.toggleFull = function() {
          if ($scope.full) {
              if(document.exitFullscreen) {
                document.exitFullscreen();
              } else if(document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
              } else if(document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
              }
            $('.navbar').css('display', 'block')
            $element.css('border-radius','12px')
            $element.css('height',window.innerHeight/2)
            $scope.termClass = ''
          } else {
            if(document.documentElement.requestFullscreen) {
              document.documentElement.requestFullscreen();
            } else if(document.documentElement.mozRequestFullScreen) {
              document.documentElement.mozRequestFullScreen();
            } else if(document.documentElement.webkitRequestFullscreen) {
              document.documentElement.webkitRequestFullscreen();
            } else if(document.documentElement.msRequestFullscreen) {
              document.documentElement.msRequestFullscreen();
            }
            $('.navbar').css('display','none')
            $element.css('border-radius','0px')
            $element.css('height','')
            $scope.termClass = 'full'
          }
          $scope.full = !$scope.full
          $rootScope.$apply();
        }
        $scope.full = false;
        $scope.togglePartiallyFull = function() {
          if ($scope.termClass !== 'full') {
              $('.navbar').css('display', 'none')
              $element.css('border-radius','0px')
              $element.css('height','')
              $scope.termClass = 'full'
          } else {
            $('.navbar').css('display', 'block')
            $element.css('border-radius','12px')
            $element.css('height',window.innerHeight/2)
            $scope.termClass = ''
          }
          $rootScope.$apply()
        }
        window.onkeyup=function (event) {
         if (event.keyCode==27 && $scope.full) {
           $scope.toggleFull();}
        }
      },
      link: function (scope, elem ) {
          $(elem).terminal(function (cmd, term) {
            if (/^\s*full\s*$/g.test(cmd)) {
              scope.toggleFull()
            } else if (/^\s*pfull\s*$/g.test(cmd)) {
              scope.togglePartiallyFull()
            } else scope.processCmd(cmd,term)
          }, {prompt: '$ ',height:window.innerHeight/2,greetings: scope.greetings});
        }
    }
});
