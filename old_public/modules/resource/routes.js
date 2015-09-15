'use strict';

angular.module('mean.resource').config(['$stateProvider',
    function($stateProvider) {
        var checkLoggedin = function($q, $timeout, $http, $location) {
            var deferred = $q.defer();

            $http.get('/loggedin').success(function(user) {
                if (user !== '0') {
                    $timeout(deferred.resolve);
                } else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        $stateProvider
        .state('all resource', {
            url: '/resource',
            templateUrl: '/partials/resource/list.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .state('create resource', {
            url: '/resource/create',
            templateUrl: '/partials/resource/create.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .state('edit resource', {
            url: '/resource/:resourceId/edit',
            templateUrl: '/partials/resource/edit.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .state('resource by id', {
            url: '/resource/:resourceId',
            templateUrl: '/partials/resource/view.html',
            resolve: {
                loggedin: checkLoggedin
            }
        });
    }
]);

