'use strict';

angular.module('bancameApp')
.controller('resource-view', ['$scope','$http', '$state', '$stateParams', '$timeout', 'Call', 'ResourceType', 'Resource', function($scope, $http, $state, $stateParams, $timeout, Call, ResourceType, Resource) {

    $scope.call = false;
    $scope.selected_resource = {};
    $scope.selected_resource_id = $stateParams.resourceId;

    $scope.getResource = function(resource_id) {
        console.log(resource_id);
        Resource.get({
            id: resource_id
        }, function(data) {
            $scope.selected_resource = data; 
            if(!$scope.call) {
                $scope.getCall($scope.selected_resource.call_id);
            }
        });
    };

    $scope.getCall = function(call_id) {
        Call.get({
            id: call_id
        }, function(data) {
            $scope.call = data; 
        });
    };


    $scope.getResource($scope.selected_resource_id);

}]);
