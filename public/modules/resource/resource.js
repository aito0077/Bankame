'use strict';

/* jshint -W098 */
angular.module('mean.resource')
.controller('ResourceController', ['$scope', '$stateParams', '$location', '$http', 'Global', 'Resource', 'Call', 'CallQuery', 'currentCall', 'ResourceType', 'Upload', 'Country', 'Organization', function($scope, $stateParams, $location, $http, Global, Resource, Call, CallQuery, currentCall, ResourceType, Upload, Country, Organization) {
    $scope.global = Global;
    $scope.selectedCall = currentCall.current();
    $scope.has_organization = false;
    $scope.call = $scope.selectedCall;
    $scope.hasAuthorization = function(resource) {
      return $scope.global.isAdmin;
    };

    $scope.countries = [];

    $scope.create = function(isValid) {
        if (isValid) {
            if($scope.organization_owner) {
                var resource = new Resource({
                    name: $scope.name,
                    description: $scope.description,
                    resource_type: $scope.resource_type_selected.id,
                    image: $scope.image,
                    conditions: $scope.conditions,
                    cost: $scope.cost,
                    organization_owner: $scope.organization_owner,
                    call_id: $scope.selectedCall.id
                });
                resource.$save(function(response) {
                    $location.path('resource/' + response.id);
                });

            } else {
                var organization = new Organization({
                    name: this.organization.name,
                    user_id: $scope.global.user.id,
                    description: this.organization.description,
                    picture_path: this.organization.picture_path,
                    country: this.organization.country
                });
                organization.$save(function(response) {
                    $scope.organization_owner = response;

                    var resource = new Resource({
                        name: $scope.name,
                        description: $scope.description,
                        resource_type: $scope.resource_type_selected.id,
                        image: $scope.image,
                        conditions: $scope.conditions,
                        cost: $scope.cost,
                        organization_owner: $scope.organization_owner,
                        call_id: $scope.selectedCall.id
                    });
                    resource.$save(function(response) {
                        $location.path('resource/' + response.id);
                    });

                });
            }
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

        if(!$scope.has_organization) {  
            $http.get('/api/me').success(function(data) {

                $scope.global.user = data.user;

                if(data.organizations && data.organizations.length > 0) {
                    Organization.get({
                        organizationId: data.organizations[0].id
                    }, function(data_organization) {
                        $scope.organization = data_organization;
                        $scope.organization_owner = $scope.organization;
                        $scope.has_organization = true;
                    });
                }
            });
            Country.query(function(data) {
                $scope.countries = data;
            });
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
            $scope.organization = resource.organization;
            if(!$scope.call) {
                $scope.call = resource.call;
            }
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

}])
.controller('EvaluationController', ['$scope', '$stateParams', '$location', '$http', 'Global', 'Resource', 'Call', 'CallQuery', 'currentCall', function($scope, $stateParams, $location, $http, Global, Resource, Call, CallQuery, currentCall) {

    $scope.resources = [];

    $scope.selected_resource = false;
    $scope.raising_projects = [];


    $scope.pop = function() {
        if(_.size($scope.resources)) {
            console.log('Has resources');
            $scope.selected_resource = _.first($scope.resources);
            $scope.raising_projects = $scope.selected_resource.projects;
            $scope.resources = _.rest($scope.resources);
        } else {
            $scope.selected_resource = false;
        }
    };

    $scope.assign = function(project) {
        $http.get('/api/projects/'+project.id+'/vote/'+$scope.selected_resource.id).success(function(data) {
            console.dir(data); 
            $scope.pop();
        });
    };

    $scope.raising = function(callId) {
        $http.get('/api/calls/'+callId+'/raising').success(function(data) {
            $scope.resources = data;
            $scope.pop();
        });
    };

    $scope.loadData = function() {
        if(!currentCall.current()) {
            CallQuery.getOpenCall(function(call){
                $scope.call = call;
                currentCall.setCurrent(call);
                $scope.selectedCall = call;
                $scope.raising($scope.selectedCall.id);
            });
        } else {
            $scope.selectedCall = currentCall.current();
            $scope.raising($scope.selectedCall.id);
        }

    };

}]);
