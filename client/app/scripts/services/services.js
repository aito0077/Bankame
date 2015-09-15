'use strict';
angular.module('bancameApp')
.factory('Call',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/calls/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])
.factory('Resource',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/resources/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])
.factory('Project',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/projects/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])
.factory('Organization',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/organizations/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])
.factory('ResourceType',['$resource', 'api_host', function($resource, api_host){
    return $resource(api_host+'/api/projects/:id', { id:'@id' }, {
        update: {
            method: 'POST'
        }
    });
}])
.factory('Account', ['$http', function($http) {
    return {
        getProfile: function() {
            return $http.get('/api/me');
        },
        getStatus: function() {
            return $http.get('/api/me/status');
        },
        updateProfile: function(profileData) {
            return $http.put('/api/me', profileData);
        }
    };
}])
.factory('TokenService',['$http', 'api_host', function($http, api_host){

        function get() {
            return $http.get(api_host+'/auth/token').then(
                success,
                fail
            );
        }
 
        function success(response) {
            return response;
        }
 
        function fail(response) {
            return response;
        }

        return {
            get: get
        };
 
}]);

