'use strict';

angular.module('mean.resource').factory('ResourceType', ['$resource',
  function($resource) {
    return $resource('/api/parametric/resources/:resourceId', {
      resourceTypeId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
