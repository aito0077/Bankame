'use strict';

angular.module('bancameApp')
.controller('user-signin', function($scope, $state, $auth, $location, $http, $rootScope) {
    $scope.user = {};
    $scope.login = function() {
        $auth.login({ email: $scope.user.email, password: $scope.user.password })
        .then(function() {
            $http.get('/api/me').success(function(response) {
                $scope.loginError = 0;
                $rootScope.user = response.user;
                $rootScope.currentUser = response.user;
                $rootScope.$broadcast('is_logged', true);

                console.log('loggedin');

                if (response.redirect) {
                    window.location = response.redirect;
                } else {
                    $location.url('/');
                }
            });

        })
        .catch(function(response) {
            console.log(response);
        });
    };
    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
        .then(function() {
            console.log('authenticated');
        })
        .catch(function(response) {
            console.log('error authenticated');
        });
    };



})
.controller('user-profile', function($scope, $state, $auth) {

})
.controller('user-signup', function($scope, $state, $auth, $location, $http, $rootScope) {
    $scope.user = {};
    $scope.signup = function() {
        $auth.signup({
            username: $scope.user.name,
            email: $scope.user.email,
            password: $scope.user.password,
            name: $scope.user.name,
            language_code: 'ES' //ToDo: Obtener del sitio
        }).then(function() {
            $http.get('/api/me').success(function(response) {
                $scope.loginError = 0;
                $rootScope.user = response.user;
                $rootScope.$emit('loggedin');

                if (response.redirect) {
                    window.location = response.redirect;
                } else {
                    $location.url('/');
                }
            });
        }).catch(function(response) {
            console.log(response);
        });
    };





})
.controller('user-edit', function($scope, $state, $auth) {


});

