'use strict';

angular.module('mean.project').controller('ProjectController', ['$scope', '$stateParams', '$location', '$http', '$q', '$timeout', 'Global', 'Project', 'currentCall',
  function($scope, $stateParams, $location, $http, $q, $timeout, Global, Project, currentCall) {
    $scope.global = Global;
    $scope.selectedCall = currentCall.current();
    $scope.hasAuthorization = function(project) {
      return $scope.global.isAdmin;
    };


    var checkProjectCondition = function($q, $timeout, $http, $location) {
        var deferred = $q.defer();

        $http.get('/calls/'+$scope.selectedCall.id+'/user/'+$scope.global.user.id).success(function(data) {
            $scope.allow_to_apply_projects = data ? data.allow_to_apply_projects : false;
            $timeout(deferred.resolve);
        });

        return deferred.promise;
    };

    checkProjectCondition($q, $timeout, $http, $location);

    $scope.uploadedProjectPicture= function(file) {
        this.picture_path = file.src;
    };



    $scope.create = function(isValid) {
      if (isValid) {
        var project = new Project({
          name: this.name,
          description: this.description,
          stakeholders: this.stakeholders,
          project_type: this.project_type,
          picture_path: this.picture_path,
          organization_owner: this.organization_owner,
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
