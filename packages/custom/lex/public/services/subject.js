'use strict';

// Subject service used for articles REST endpoint
angular.module('mean.lex').factory('Subject', ['$resource',
  function($resource) {
    return $resource('api/subjects/:subjectId', {
      subjectId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
