'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', '$http', 'Global', 'CallQuery', 'currentCall',
    function($scope, $http, Global, CallQuery, currentCall) {
        $scope.global = Global;
        $scope.resources = [];

        $scope.find = function() {
            $scope.date = new Date().getTime();
          
            if($scope.call) {
                $http.get('/api/resources/call/'+call.id).success(function(data) {
                    $scope.resources = data;
                });
            } else {
                CallQuery.getOpenCall(function(call){
                    $scope.call = call;
                    currentCall.setCurrent(call);
                    if(call) {
                        $http.get('/api/resources/call/'+call.id).success(function(data) {
                            $scope.resources = data;
                        });
                    }
                });
            }

        };

        $scope.getTags = function(input) {
            return input ? input.split(';') : [];
        };
    }
]);
