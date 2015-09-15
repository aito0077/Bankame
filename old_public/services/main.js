'use strict';

angular.module('mean.main')
.factory('Organization', ['$resource',
  function($resource) {
    return $resource('/api/organizations/:organizationId', {
      organizationId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
])
.factory('ResourceType', ['$resource',
  function($resource) {
    return $resource('/api/parametric/resources/:resourceId', {
      resourceTypeId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
])
.factory('ProjectType', ['$resource',
  function($resource) {
    return $resource('/api/parametric/projects/:projectId', {
      projectTypeId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
])
.factory('Country', ['$resource',
  function($resource) {
    return $resource('/api/parametric/countries/:countryId', {
      countryId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
