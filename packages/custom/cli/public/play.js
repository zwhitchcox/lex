'use strict';
angular.module('mean.cli').controller('CLIPlayController', [
  '$scope', '$stateParams', '$location', 'Global', 'CLI', 'Subject', 'Exercises', 'Module', function($scope, $stateParams, $location, Global, CLI, Subject, Exercises, Module) {
    var cmds, getExercises, getRandomExercise, getSubject, play, setModule, showModules, subjectOptions, termCmd;
    $scope.global = Global;
    $scope.wrongs = 0;
    play = function(cmd, term) {
      if (termCmd(cmd, term)) {

      } else if ($scope.playing) {
        if (RegExp($scope.currentX.solution).test(cmd)) {
          term.echo($scope.currentX.output);
          if (!$scope.currentX.right) {
            $scope.currentX.right = 1;
          } else {
            $scope.exercises.splice($scope.exercises.indexOf($scope.currentX), 1);
          }
        } else {
          $scope.wrongs++;
          term.echo("[[;#f00;]" + $scope.currentX.sample + "]");
        }
        return $scope.play();
      }
    };
    $scope.playing = false;
    $scope.prompt = '$ ';
    $scope.play = function() {
      var seconds;
      if ($scope.exercises.length) {
        if (($scope.currentX == null) || ($scope.currentX.next == null)) {
          $scope.currentX = getRandomExercise();
        } else {
          $scope.currentX = _.find($scope.exercises, function(ex) {
            return ex._id === $scope.currentX.next;
          });
          console.log('found');
        }
        return $scope.terminal.echo($scope.currentX.challenge);
      } else {
        Module.get({
          subjectName: $scope.subject,
          moduleName: $scope.currentX.module
        });
        $scope.terminal.echo('Congratulations, you won!');
        seconds = Date.now() / 1000 - $scope.start;
        $scope.terminal.echo("Time: " + Math.floor(seconds / 60) + ":" + (seconds < 10 ? '0' : '') + Math.floor(seconds));
        $scope.terminal.echo((1 - $scope.wrongs / $scope.numX) * 100 + "%");
        window.user.modules[$scope.subject].push($scope.currentX.module);
        setModule($scope.modules.indexOf($scope.curModule) + 1);
        return $scope.playing = false;
      }
    };
    getRandomExercise = function() {
      var index;
      while (true) {
        index = Math.floor(Math.random() * $scope.exercises.length);
        if ($scope.exercises.every(function(ex) {
          return $scope.exercises[index]._id !== ex.next;
        })) {
          break;
        }
      }
      return $scope.exercises[index];
    };
    $scope.stop = function() {
      $scope.playing = false;
      $scope.paused = true;
      return $scope.pauseTime = Date.now() / 1000;
    };
    subjectOptions = "Please choose a subject:\n\n 01: Unix    (Mac)\n 02: MS DOS  (Windows)\n 03: git\n";
    getSubject = function(cmd) {
      switch (parseInt(cmd)) {
        case 1:
          $scope.subject = 'unix';
          $scope.prompt = '$ ';
          break;
        case 2:
          $scope.subject = 'dos';
          $scope.prompt = 'C:\\> ';
          break;
        case 3:
          $scope.subject = 'git';
          $scope.prompt = '$ ';
          break;
        default:
          return $scope.terminal.echo(subjectOptions);
      }
      getExercises();
      return $scope.processCmd = play;
    };
    $scope.greetings = subjectOptions;
    $scope.init = function() {
      return $scope.processCmd = getSubject;
    };
    setModule = function(idx) {
      var j, len, module, ref;
      if (idx != null) {
        $scope.curModule = $.extend(true, {}, $scope.modules[idx]);
        if ($scope.curModule == null) {
          return setModule();
        }
        $scope.exercises = $scope.curModule.exercises;
        showModules(null, $scope.terminal);
        $scope.numX = $scope.curModule.exercises.length;
        return;
      }
      ref = $scope.modules;
      for (j = 0, len = ref.length; j < len; j++) {
        module = ref[j];
        if (!~window.user.modules[$scope.subject].indexOf(module.name)) {
          $scope.curModule = $.extend(true, {}, module);
          $scope.exercises = $scope.curModule.exercises;
          showModules(null, $scope.terminal);
          $scope.numX = $scope.curModule.exercises.length;
          break;
        }
      }
      if ($scope.curModule == null) {
        return $scope.terminal.echo('You have completed this subject.');
      }
    };
    getExercises = function() {
      return Exercises.query({
        subjectName: $scope.subject,
        modelName: 'cli'
      }, function(modules) {
        $scope.modules = modules;
        $scope.terminal.echo("Welcome to the " + $scope.subject + " exercises.\nUse 'help' to show commands, 'start' to begin.");
        return setModule();
      });
    };
    termCmd = function(userCmd, term) {
      var cmd;
      for (cmd in cmds) {
        if (cmds[cmd].test.test(userCmd)) {
          cmds[cmd].action(userCmd, term);
          return true;
        }
      }
      return false;
    };
    showModules = function(cmd, term) {
      if ($scope.modules != null) {
        return $scope.modules.forEach(function(el, idx) {
          var mod;
          mod = (idx < 10 ? "0" + (idx + 1) : idx + 1) + (": " + el.name);
          if ($scope.curModule.name === el.name) {
            return term.echo("[[;#00f;]" + mod + "]");
          } else if (~window.user.modules[$scope.subject].indexOf(el.name)) {
            return term.echo("[[;#f00;]" + mod + "]");
          } else {
            return term.echo(mod);
          }
        });
      } else {
        return term.echo('You must set a module first!');
      }
    };
    cmds = {
      help: {
        test: /^\s*help\s*$/g,
        action: function(cmd, term) {
          return term.echo($scope.commands);
        }
      },
      start: {
        test: /^\s*start\s*$/g,
        action: function() {
          if (!$scope.paused) {
            $scope.playing = true;
            $scope.start = Date.now() / 1000;
          } else {
            $scope.playing = true;
            $scope.paused = false;
            $scope.start = Date.now() / 1000 - $scope.start + $scope.pauseTime;
          }
          return $scope.play();
        }
      },
      stop: {
        test: /^\s*stop\s*$/g,
        action: function() {
          return $scope.stop();
        }
      },
      modules: {
        test: /^\s*modules\s*$/g,
        action: showModules
      },
      change: {
        test: /^\s*cm\s*[0-9]+\s*$/g,
        action: function(cmd, term) {
          return setModule(parseInt(cmd.split(/\s+/)[1]) - 1);
        }
      }
    };
    $scope.commands = "full                              Full screen\npfull                             Pretty full screen\nstart                             Begin exercises\nstop                              Stop exercises and save your progress\ncm <module>                       Change module (by #)\nmodules                           Show modules\nclear                             Clear screen\nand that's about it...\n\n\nDon't worry if you don't totally understand everything right away\n";
    return Array.prototype.getIndexBy = function(name, value) {
      var i, j, len, prop;
      for (i = j = 0, len = this.length; j < len; i = ++j) {
        prop = this[i];
        if (this[i][name] === value) {
          return i;
        }
      }
    };
  }
]);
