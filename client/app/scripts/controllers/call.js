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
.controller('call-list', ['$scope', '$timeout', 'Call', function($scope, $timeout, Call) {
   
    $scope.calls = [];

    $scope.list = function() {
        Call.query(function(calls) {
            $scope.calls = calls;
        });
    };

    $scope.list();

    $scope.isot = false;
    $scope.current_filter = false;

    $scope.filter = function(filter) {
        if($scope.isot) {
            $scope.current_filter = filter;
            $scope.isot.isotope({
                filter: filter ? '.'+filter : '*'
            });
        }        
    };

    $scope.$watch('calls', function() {
        console.log('calls watch '+$scope.calls.length);
        if($scope.calls.length > 0) {
            $timeout(function() {
                $scope.isot = angular.element('#call-grid');
                $scope.isot.isotope({
                    itemSelector: '.grid-item',
                    masonry: {
                        columnWidth: '.grid-sizer'
                    }
                });
            });
        }
    });
    $scope.setup_components = function() {
    };

    $scope.isBig = function(call) {
      return call.remark == 1;  
    };
 
}])
.controller('call-view', ['$scope','$http', '$state', '$stateParams', '$timeout', '$location', 'Call', 'ResourceType', 'Resource', function($scope, $http, $state, $stateParams, $timeout, $location, Call, ResourceType, Resource) {

    console.log('call-view');
    console.log('view param id: '+$stateParams.callId);

    $scope.call = {};
    $scope.tweets = [];

    $scope.getCall = function() {
        Call.get({
            id: $stateParams.callId
        }, function(data) {
            $scope.call = data; 
            $scope.setup_components($scope.call);
        });
    };

    $scope.setup_components = function(call) {
        if(call.twitter_hashtag) {
            twitterFetcher.fetch(call.twitter_hashtag, '', 5, true, true, true, '', false, function(tweets) {
                $scope.tweets = tweets;
            });
        }



    };


    $scope.getCall();

    $scope.editing_resource = false;
    $scope.tags = [];
    $scope.resourceTypes = [];

    $scope.show_resource_form = function() {
        $scope.editing_resource = true;

        ResourceType.query(function(data) {
            $scope.resourceTypes = _.filter(data, function(model) {
                return model.parent_id;
            });
            $timeout(function() {
                $('#tags').selectize({
                    create: false,
                    maxItems: null,
                    //selectOnTab: true,
                    valueField: 'id',
                    items: $scope.tags,
                    labelField: 'description',
                    searchField: 'description',
                    onChange: function(value) {

                    }
                });
            });

        });




    };

    $scope.create_resource = function(isValid) {
        if (isValid) {
                var resource = new Resource({
                    name: $scope.resource.name,
                    description: $scope.resource.description,
                    //resource_type: $scope.resource.resource_type_selected.id,
                    tags: $scope.resource.tags,
                    image: $scope.resource.image,
                    conditions: $scope.resource.conditions,
                    cost: $scope.resource.cost,
                    call_id: $scope.call.id
                });
                resource.$save(function(response) {
                   $scope.getCall(); 
                });

        } else {
            $scope.submitted = true;
        }
    };

    $scope.view_resource = function(resource) {
        $location.path('resource/' + resource.id);
    };

        

}]);

