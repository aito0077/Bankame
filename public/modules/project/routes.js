'use strict';

angular.module('mean.project').config(['$stateProvider',
    function($stateProvider) {
        var checkLoggedin = function($q, $timeout, $http, $location) {
            var deferred = $q.defer();

            $http.get('/loggedin').success(function(user) {
                //if (user !== '0') {
                if (true) {
                    $timeout(deferred.resolve);
                } else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        $stateProvider
        .state('project example page', {
            url: '/project/example',
            templateUrl: '/partials/project/index.html'
        })
        .state('all project', {
            url: '/project',
            templateUrl: '/partials/project/list.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .state('create project', {
            url: '/project/create',
            templateUrl: '/partials/project/create.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .state('edit project', {
            url: '/project/:projectId/edit',
            templateUrl: '/partials/project/edit.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .state('project by id', {
            url: '/project/:projectId',
            templateUrl: '/partials/project/view.html',
            resolve: {
                loggedin: checkLoggedin
            }
        });
    }
]);

