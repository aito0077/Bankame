'use strict';

/* jshint -W098 */
angular.module('mean.main')
.controller('OrganizationController', ['$scope', '$stateParams', '$location', '$http', 'Global', 'Organization',
    function($scope, $stateParams, $location, $http, Global, Organization, Call, CallQuery) {
        $scope.global = Global;
        $scope.hasAuthorization = function() {
            return $scope.global.isAdmin;
        };

        $scope.hasOrganization = function() {
            return $scope.global.user && $scope.global.user.has_organization;
        };

        $scope.create = function(isValid) {
            if (isValid) {
                var organization = new Organization({
                    name: this.name,
                    user_id: $scope.global.user.id,
                    description: this.description,
                    picture_path: this.picture_path,
                    country: this.country
                });
                organization.$save(function(response) {
                    $location.path('organization/' + response._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.findOne = function() {
            Organization.get({
                resourceId: $stateParams.resourceId
            }, function(organization) {
                $scope.organization = organization;
            });
        };

        $scope.loadData = function() {
            if($scope.hasOrganization()) {  
                $http.get('/users/me').success(function(data) {
                    console.dir(data);
                    Organization.get({
                        organizationId: data.organization
                    }, function(organization) {
                        $scope.organization = organization;
                    });
                });
            }
        };

        $scope.uploadedOrganizationPicture= function(file) {
            this.picture_path = file.src;
        };


  }
]);
