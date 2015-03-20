'use strict';

angular.module('mean.lex').factory('Module', ['$resource',
  function($resource) {
    return $resource('api/modules/:subjectName/:moduleName', {
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
