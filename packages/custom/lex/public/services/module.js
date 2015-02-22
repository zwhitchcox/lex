'use strict';

angular.module('mean.lex').factory('Module', ['$resource',
  function($resource) {
    return $resource('api/modules/:moduleId', {
      moduleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
