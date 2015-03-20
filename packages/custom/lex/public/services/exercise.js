'use strict';

// Subject service used for articles REST endpoint
angular.module('mean.lex').factory('Exercises', ['$resource',
  function($resource) {
    return $resource('api/model/:modelName/:subjectName/exercises/:exerciseId')
  }
])
