'use strict';

// Subject service used for articles REST endpoint
angular.module('mean.cli').factory('CLI', ['$resource',
  function($resource) {
    return $resource('api/model/cli/:exerciseId', {
      exerciseId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
