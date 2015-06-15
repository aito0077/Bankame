'use strict';

angular.module('mean.resource').factory('Resource', ['$resource',
  function($resource) {
    return $resource('/api/resources/:resourceId', {
      resourceId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
