angular.module('mean.algos').factory('Algos', ['$resource',
  function($resource) {
    return $resource('api/model/algos/:exerciseId', {
      exerciseId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
