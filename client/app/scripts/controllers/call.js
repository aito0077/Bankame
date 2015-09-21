'use strict';

angular.module('bancameApp')
.controller('call-edit', function($scope, $state, $auth, Upload, Call, Interest) {
    $scope.call = new Call({});

    $scope.doValidate = function() {
        return true;
    };

    $scope.doSave = function() {
        if($scope.doValidate()) {
            $scope.call.$save(function(data) {
                $state.go('call-view', {
                    callId: $scope.call.id
                }); 
            });
        }
    };

    $scope.files = [];

    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
         if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/api/winwins/upload',
                    fields: {},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function (data, status, headers, config) {
                    $scope.call.photo = data.filename;
                });
            }
        }
    };

})
.controller('call-list', ['$scope', 'CallPaginate', function($scope, CallPaginate) {
   
 
}])
.controller('call-view', ['$scope','$http', '$state', '$stateParams', '$timeout', 'Call', function($scope, $http, $state, $stateParams, $timeout, Call) {

    console.log('call-view');

    $scope.call = {};
    $scope.getCall = function() {
        Call.get({
            id: $stateParams.callId
        }, function(data) {
            $scope.call = data; 
        });
    }

    $scope.getCall();


}]);

