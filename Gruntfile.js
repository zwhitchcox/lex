'use strict';

var paths = {
  js: ['*.js', 'test/**/*.js', '!test/coverage/**', '!bower_components/**', 'packages/**/*.js', '!packages/**/node_modules/**', '!packages/contrib/**/*.js', '!packages/contrib/**/node_modules/**'],
  html: ['packages/**/public/**/views/**', 'packages/**/server/views/**'],
  css: ['!bower_components/**', 'packages/**/public/**/css/*.css', '!packages/contrib/**/public/**/css/*.css'],
  coffee: ['*.coffee', 'test/**/*.coffee', '!test/coverage/**', '!bower_components/**', 'packages/**/*.coffee', '!packages/**/node_modules/**', '!packages/contrib/**/*.coffee', '!packages/contrib/**/node_modules/**'],
  es6:['*.es6', 'test/**/*.es6', '!test/coverage/**', '!bower_components/**', 'packages/**/*.es6', '!packages/**/node_modules/**', '!packages/contrib/**/*.es6', '!packages/contrib/**/node_modules/**']


};

module.exports = function(grunt) {

  if (process.env.NODE_ENV !== 'production') {
    require('time-grunt')(grunt);
  }

  // Project Configuration
  grunt.initConfig({
    traceur: {
      options: {
        // traceur options here
        experimental: true,
        // module naming options,
        copyRuntime: 'bower_components/traceur'
      },
      custom: {
        files: [{
          expand: true,
          cwd: '',
          src: [paths.es6],
          dest: '',
          ext:'.js'
        }]
      },
    },
    coffee: {
      glob_to_multiple: {
        expand: true,
        cwd: '',
        src: paths.coffee,
        dest: '',
        ext: '.js'
      }

    },
    pkg: grunt.file.readJSON('package.json'),
    assets: grunt.file.readJSON('config/assets.json'),
    clean: ['bower_components/build'],
    watch: {
      coffee: {
        files: paths.coffee,
        tasks: ['coffee'],
        options: {
          livereload: true
        }
      },
      es6: {
        files: paths.es6,
        tasks: ['traceur'],
        options: {
          livereload: true
        }
      },
      js: {
        files: paths.js,
        tasks: ['coffee','traceur'],
        options: {
          livereload: true
        }
      },
      html: {
        files: paths.html,
        options: {
          livereload: true,
          interval: 500
        }
      },
      css: {
        files: paths.css,
        tasks: ['csslint'],
        options: {
          livereload: true
        }
      }
    },
    jshint: {
      all: {
        src: paths.js,
        options: {
          jshintrc: true
        }
      }
    },
    uglify: {
      core: {
        options: {
          mangle: false
        },
        files: '<%= assets.core.js %>'
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: paths.css
    },
    cssmin: {
      core: {
        files: '<%= assets.core.css %>'
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          args: [],
          ignore: ['node_modules/**'],
          ext: 'js,html',
          nodeArgs: ['--debug'],
          delayTime: 1,
          cwd: __dirname
        }
      }
    },
    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        require: [
          'server.js',
          function() {
            require('meanio/lib/core_modules/module/util').preload(__dirname + '/packages/**/server', 'model');
          }
        ]
      },
      src: ['packages/**/server/tests/**/*.js']
    },
    env: {
      test: {
        NODE_ENV: 'test'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  //Load NPM tasks
  require('load-grunt-tasks')(grunt);

  /**
   * Default Task
   */
  grunt.hook.push('clean', -9999);
  grunt.hook.push('concurrent', 9999);
  grunt.hook.push('coffee', -9998)
  grunt.hook.push('traceur',-9997)
  if (process.env.NODE_ENV === 'production') {
    grunt.hook.push('cssmin', 100);
    grunt.hook.push('uglify', 200);
  }

  //Default task.
  grunt.registerTask('default', ['hook']);

  //Test task.
  grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);

  // For Heroku users only.
  // Docs: https://github.com/linnovate/mean/wiki/Deploying-on-Heroku
  grunt.registerTask('heroku:production', ['cssmin', 'uglify']);
};
