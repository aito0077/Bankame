'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', '$auth', '$http', 'Global', 'Menus', 'currentCall', function($scope, $rootScope, $auth, $http, Global, Menus, currentCall) {
    $scope.global = Global;
    $scope.isAuthenticated = function() {
        var authenticated = $auth.isAuthenticated();
        if(authenticated && !$scope.global.user && !$rootScope.retrieve_user) {
            $rootScope.retrieve_user = true;
            $http.get('/api/me').success(function(response) {
                $rootScope.user = response.user;
                $rootScope.$emit('loggedin');
            });
        }
        return authenticated;

    };

    $scope.menus = {};
    $scope.selectedCall = currentCall.current();

    var defaultMainMenu = [];
    $scope.isCollapsed = false;

    $rootScope.$on('loggedin', function() {
        $rootScope.retrieve_user = true;
        $scope.global = {
            authenticated: !! $rootScope.user,
            user: $rootScope.user
        };

        if(!$scope.global.user || !$scope.global.user.username) {
            $http.get('/api/me').success(function(response) {
                $scope.global.user = response.user;
            });
        }
    });

    $scope.logout = function() {
        $auth.logout()
        .then(function() {
            $scope.global = {
                authenticated: false,
                user: undefined
            };

        });
    };


  }
]);
