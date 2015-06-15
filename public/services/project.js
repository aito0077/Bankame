'use strict';

angular.module('mean.project').factory('Project', ['$resource',
  function($resource) {
    console.log('project');
    return $resource('/api/projects/:projectId', {
      projectId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
