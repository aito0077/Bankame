'use strict';

/* jshint -W098 */
angular.module('mean.resource')
.controller('ResourceController', ['$scope', '$stateParams', '$location', '$timeout', '$http', 'Global', 'Resource', 'Call', 'CallQuery', 'currentCall', 'ResourceType', 'Upload', 'Country', 'Organization', function($scope, $stateParams, $location, $timeout,  $http, Global, Resource, Call, CallQuery, currentCall, ResourceType, Upload, Country, Organization) {
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
                    //resource_type: $scope.resource_type_selected.id,
                    tags: $scope.tags,
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
                        tags: $scope.tags,
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

    $scope.getTags = function(input) {
        return input ? input.split(';') : [];
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

    $scope.uploading = false;
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
                    $scope.uploading = true;
                }).success(function (data, status, headers, config) {
                    $scope.image = data.filename;
                    $scope.uploading = false;
                }).error(function (data, status, headers, config) {
                    $scope.uploading = false;
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
            $scope.selected_resource = _.first($scope.resources);
            $scope.raising_projects = $scope.selected_resource.projects;
            $scope.resources = _.rest($scope.resources);
        } else {
            $scope.selected_resource = false;
        }
    };

    $scope.assign = function(project) {
        $http.get('/api/projects/'+project.id+'/vote/'+$scope.selected_resource.id).success(function(data) {
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

}])
.controller('ResourceListController', ['$scope', '$stateParams', '$location', '$http', '$timeout', 'Global', 'Resource', 'Call', 'CallQuery', 'currentCall', function($scope, $stateParams, $location, $http, $timeout, Global, Resource, Call, CallQuery, currentCall) {

    $scope.resources = [];
    $scope.parent_filters = [];
    $scope.sub_filters = [];
    $scope.selected_main_filter = false;

    $scope.loadData = function() {
        $scope.getFilters();
        if(!currentCall.current()) {
            CallQuery.getOpenCall(function(call){
                $scope.call = call;
                currentCall.setCurrent(call);
                $scope.selectedCall = call;
                $scope.getCallResources($scope.selectedCall.id);
            });
        } else {
            $scope.selectedCall = currentCall.current();
            $scope.getCallResources($scope.selectedCall.id);
        }

    };

    $scope.getFilters = function() {
        $http.get('/api/parametric/resources/filters').success(function(data) {
            $scope.parent_filters = data;
            //$scope.selected_main_filter = $scope.parent_filters[0];
            $scope.$emit('selected_main_filter');
        });
    };

    $scope.getCallResources = function(callId) {
        $http.get('/api/resources/call/'+$scope.selectedCall.id).success(function(data) {
            $scope.resources = data;
            $timeout(function () {
                $scope.do_filter();
            }, 1000);
        });
    };

    $scope.selectMainFilter = function(item) {
        $scope.selected_main_filter = item;
        $scope.$emit('selected_main_filter');

    };

    $scope.$on('selected_main_filter', function() {
        if($scope.selected_main_filter) {
            $scope.sub_filters = $scope.selected_main_filter ? $scope.selected_main_filter.children : [];
           
            var subfilters_isotope = '';
            _.each($scope.sub_filters, function(item) {
                subfilters_isotope = subfilters_isotope + '.' + item.name + ', ';
            }); 

            $scope.category_selected = subfilters_isotope.replace(/,\s*$/, "");
            $scope.do_filter();
        }
    });

    $scope.clearFilter = function() {
        $scope.category_selected = false;
        $scope.do_filter();
    };


    $scope.select = function(resource) {
        $scope.selected = resource;
        console.log('Selected');
        $('#resource-modal').show();
    };

    $scope.filter = function(item) {
        $scope.category_selected = '.'+item.name;
        $scope.do_filter();
    };

    $scope.do_filter = function() {
        var filter = $scope.category_selected ? $scope.category_selected : '*';
        $('.lista-recursos').isotope({ 
            itemSelector: '.lista-recursos__item',
            layoutMode: 'fitRows',
            filter: filter
        });
    };

    $scope.getTags = function(input) {
        return input ? input.split(';') : [];
    };

    $scope.tagsToClass = function(input) {
        var classes = input ? input.replace(/;/g, ' '): '' ; 
        return classes;
    };

}]);

 
