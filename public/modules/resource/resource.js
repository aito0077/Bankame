'use strict';

/* jshint -W098 */
angular.module('mean.resource').controller('ResourceController', ['$scope', '$stateParams', '$location', '$http', 'Global', 'Resource', 'Call', 'CallQuery', 'currentCall', 'ResourceType', 'Upload',
  function($scope, $stateParams, $location, $http, Global, Resource, Call, CallQuery, currentCall, ResourceType, Upload) {
    $scope.global = Global;
    $scope.selectedCall = currentCall.current();
    $scope.call = $scope.selectedCall;
    $scope.hasAuthorization = function(resource) {
      return $scope.global.isAdmin;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var resource = new Resource({
          name: this.name,
          description: this.description,
          resource_type: this.resource_type_selected.id,
          image: this.image,
          conditions: this.conditions,
          cost: this.cost,
          organization_owner: this.organization_owner,
          call_id: $scope.selectedCall.id
        });
        resource.$save(function(response) {
          $location.path('resource/' + response.id);
        });

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(resource) {
      if (resource) {
        resource.$remove(function(response) {
          for (var i in $scope.resource) {
            if ($scope.resource[i] === resource) {
	      $scope.resource.splice(i,1);
            }
          }
          $location.path('resource');
        });
      } else {
        $scope.resource.$remove(function(response) {
          $location.path('resource');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var resource = $scope.resource;
        if(!resource.updated) {
          resource.updated = [];
        }
        resource.updated.push(new Date().getTime());

        resource.$update(function() {
          $location.path('resource/' + resource.id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.loadData = function() {
        if(!currentCall.current()) {
            CallQuery.getOpenCall(function(call){
                $scope.call = call;
                currentCall.setCurrent(call);
                $scope.selectedCall = call;
            });
        } else {
            $scope.selectedCall = currentCall.current();
        }

        ResourceType.query(function(data) {
            $scope.resourceTypes = data;
        });
    };

    $scope.find = function() {
      Resource.query(function(resources) {
        $scope.resources = resources;
      });

        /*
      CallQuery.getOpenCall(function(call){
        $scope.call = call;
      });
        */

    };

    $scope.findOne = function() {
        Resource.get({
            resourceId: $stateParams.resourceId
        }, function(resource) {
            $scope.resource = resource;
        });
    };

    $scope.prepareRisingResource = function() {
        $http.get('/projects').success(function(data) {
            $scope.projects = data;
        });
    };

    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/api/upload',
                    fields: {'username': $scope.username},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function (data, status, headers, config) {
                    $scope.image = data.filename;
                });
            }
        }
    };

  }
]);
