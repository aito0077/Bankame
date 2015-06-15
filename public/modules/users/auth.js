'use strict';

//Setting up route
angular.module('mean.users').config(['$meanStateProvider', function($meanStateProvider) {
    var checkLoggedOut = function($q, $timeout, $http, $location) {
        var deferred = $q.defer();
        $http.get('/loggedin').success(function(user) {
            if (user !== '0') {
                $timeout(deferred.reject);
                $location.url('/login');
            }
            else $timeout(deferred.resolve);
        });

        return deferred.promise;
    };


    $meanStateProvider
    .state('auth', {
        url: '/auth',
        templateUrl: '/partials/users/index.html'
    })
    .state('auth.login', {
        url: '/login',
        templateUrl: '/partials/users/login.html',
        resolve: {
            loggedin: checkLoggedOut
        }
    })
    .state('auth.register', {
        url: '/register',
        templateUrl: '/partials/users/register.html',
        resolve: {
            loggedin: checkLoggedOut
        }
    })
    .state('forgot-password', {
        url: '/forgot-password',
        templateUrl: '/partials/users/forgot-password.html',
        resolve: {
            loggedin: checkLoggedOut
        }
    })
    .state('reset-password', {
        url: '/reset/:tokenId',
        templateUrl: '/partials/users/reset-password.html',
        resolve: {
            loggedin: checkLoggedOut
        }
    });
}]);
