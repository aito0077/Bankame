'use strict';

angular.module('mean.main').factory('Organization', ['$resource',
  function($resource) {
    return $resource('organization/:organizationId', {
      organizationId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
