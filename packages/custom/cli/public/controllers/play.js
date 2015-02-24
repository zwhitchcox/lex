'use strict';

angular.module('mean.cli').controller('CLIPlayController', ['$scope',
'$stateParams', '$location', 'Global', 'CLI', 'Subject', 'Exercises',
  function($scope, $stateParams, $location, Global, Challenge, Subject, Exercises) {
    $scope.global = Global;
      $scope.processCmd = function(cmd,term) {
          if (/^\s*help\s*$/g.test(cmd))
            term.echo($scope.commands)
          else if (/^\s*start\s*$/g.test(cmd)) {
            $scope.play()
            $scope.playing = true
          }
          else if (/^\s*stop\s*$/g.test(cmd)) {
            $scope.stop()
          }
          else if ($scope.playing) {
            cmd = cmd.split(/\s*/g)
            var sol = $scope.currentX.solutions[0].split(/\s*/g)
            var right = (sol.equals(cmd))
            if (right) {
              //right
              term.echo($scope.currentX.output)
              if (!$scope.currentX.right) $scope.currentX.right = 1
                else $scope.exercises.splice(
                  $scope.exercises.indexOf($scope.currentX), 1
                )
            } else {
              //wrong
              term.echo("[[;#f00;]" + $scope.currentX.solutions[0] + "]")
            }

            $scope.play()
          }
      }

      $scope.subject = $stateParams.subjectName
      $scope.playing = false
      $scope.prompt = '$ '
      $scope.play = function() {
        if ($scope.exercises.length) {
          $scope.currentX = getRandomExercise()
          $scope.terminal.echo($scope.currentX.challenge)
        } else {
          $scope.terminal.echo('Congratulations, big guy! You won!')
        }

      }
      var getRandomExercise = function() {
        var index = Math.floor(Math.random() * $scope.exercises.length)
        return $scope.exercises[index]
      }
      $scope.stop = function() {
        $scope.playing = false
      }
      $scope.init = function() {
        $scope.getExercises()
        $scope.greetings = ''
      }

      $scope.getExercises = function() {
        Exercises.query({
            subjectName: $stateParams.subjectName,
            modelName: 'cli'
        }, function(exercises) {
          $scope.exercises = exercises;
          $scope.terminal.echo('Welcome to the '+$scope.exercises[0].subject.name+
          ' exercises.\nUse \'help\' to show commands.')
        });
      }
      $scope.commands =
        "full                              Full screen\n"+
        "pfull                             Pretty full screen\n"+
        "start                             Begin exercises\n"+
        "stop                              Stop exercises and save your progress\n"+
        "cm <module>                       Change module (can be # or name)\n"+
        "modules                           Show modules\n"+
        "clear                             Clear screen\n"+
        "and that's about it...\n\n"+
        "Your progress is automatically saved every time you complete a module, btdubs.\n"

    Array.prototype.equals = function (array) {
          // if the other array is a falsy value, return
          if (!array)
              return false;

          // compare lengths - can save a lot of time
          if (this.length != array.length)
              return false;

          for (var i = 0, l=this.length; i < l; i++) {
              // Check if we have nested arrays
              if (this[i] instanceof Array && array[i] instanceof Array) {
                  // recurse into the nested arrays
                  if (!this[i].equals(array[i]))
                      return false;
              }
              else if (this[i] != array[i]) {
                  // Warning - two different object instances will never be equal: {x:20} != {x:20}
                  return false;
              }
          }
          return true;
      }
    }
]);
