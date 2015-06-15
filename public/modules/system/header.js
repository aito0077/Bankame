'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', '$auth', 'Global', 'Menus', 'currentCall', function($scope, $rootScope, $auth, Global, Menus, currentCall) {
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    $scope.global = Global;
    $scope.menus = {};
    $scope.selectedCall = currentCall.current();

    var defaultMainMenu = [];
    $scope.isCollapsed = false;

    $rootScope.$on('loggedin', function() {
        $scope.global = {
            authenticated: !! $rootScope.user,
            user: $rootScope.user
        };
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
