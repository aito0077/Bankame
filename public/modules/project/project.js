'use strict';

angular.module('mean.project').controller('ProjectController', ['$scope', '$stateParams', '$location', '$http', '$q', '$timeout', 'Global', 'Project', 'Resource', 'Call', 'CallQuery', 'currentCall', 'Upload', 'ProjectType', 'Organization', function($scope, $stateParams, $location, $http, $q, $timeout, Global, Project, Resource, Call, CallQuery, currentCall, Upload, ProjectType, Organization) {
    $scope.global = Global;
    $scope.selectedCall = currentCall.current();
    $scope.projectTypes = [];
    $scope.resource_id = $stateParams.resourceId;
    $scope.has_organization = false;

    $scope.hasAuthorization = function(project) {
      return $scope.global.isAdmin;
    };

    $scope.checkProjectCondition = function($q, $timeout, $http, $location) {
        var deferred = $q.defer();

        $http.get('/api/calls/'+$scope.selectedCall.id+'/user/'+$scope.global.user.id).success(function(data) {
            $scope.allow_to_apply_projects = data ? data.allow_to_apply_projects : false;
            $timeout(deferred.resolve);
        });

        return deferred.promise;
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


    $scope.create = function(isValid) {
      if (isValid) {
        var project = new Project({
            name: this.name,
            description: this.description,
            stakeholders: this.stakeholders,
            image: this.image,
            project_type: $scope.project_type_selected.id,
            organization_id: this.organization_owner.id,
            call_id: this.selectedCall.id
        });
        project.$save(function(response) {
          $location.path('project/' + response.id);
        });

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(project) {
      if (project) {
        project.$remove(function(response) {
          for (var i in $scope.project) {
            if ($scope.project[i] === project) {
	      $scope.project.splice(i,1);
            }
          }
          $location.path('project');
        });
      } else {
        $scope.project.$remove(function(response) {
          $location.path('project');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var project = $scope.project;
        if(!project.updated) {
          project.updated = [];
        }
        project.updated.push(new Date().getTime());

        project.$update(function() {
          $location.path('project/' + project.id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.loadData = function() {
        Resource.get({
            resourceId: $stateParams.resourceId
        }, function(resource) {
            $scope.resource_selected = resource;
        });
        if(!currentCall.current()) {
            CallQuery.getOpenCall(function(call){
                $scope.call = call;
                currentCall.setCurrent(call);
                $scope.selectedCall = call;
                $scope.checkProjectCondition($q, $timeout, $http, $location);
            });
        } else {
            $scope.selectedCall = currentCall.current();
            $scope.checkProjectCondition($q, $timeout, $http, $location);
        }
        ProjectType.query(function(data) {
            $scope.projectTypes = data;
        });

        if(!$scope.has_organization || !$scope.global.user) {  
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
        }


    };

    $scope.find = function() {
        $scope.call = currentCall.current();
            Project.query(function(projects) {
            $scope.projects = projects;
        });
    };

    $scope.findOne = function() {
        Project.get({
            projectId: $stateParams.projectId
        }, function(project) {
            $scope.project = project;
        });
    };
  }
]);
