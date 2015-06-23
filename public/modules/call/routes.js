'use strict';

angular.module('mean.call').config(['$stateProvider',
    function($stateProvider) {
        var checkLoggedin = function($q, $timeout, $http, $location) {
            var deferred = $q.defer();

            $http.get('/loggedin').success(function(user) {
                if (user !== '0') {
                    $timeout(deferred.resolve);
                } else {
                    $timeout(deferred.reject);
                    $location.url('/auth/login');
                }
            });

            return deferred.promise;
        };

        $stateProvider
        .state('all call', {
            url: '/call',
            templateUrl: '/partials/call/list.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .state('create call', {
            url: '/call/create',
            templateUrl: '/partials/call/create.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .state('edit call', {
            url: '/call/:callId/edit',
            templateUrl: '/partials/call/edit.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        .state('call by id', {
            url: '/call/:callId',
            templateUrl: '/partials/call/view.html',
            resolve: {
                loggedin: checkLoggedin
            }
        })
        //Subviews
        .state('call by id.share_resource', {
            url: '/call/:callId',
            templateUrl: '/partials/resource/create.html'
        })
        .state('call by id.apply_project', {
            url: '/call/:callId',
            templateUrl: '/partials/resource/list.html'
        })
        .state('call by id.project', {
            url: '/call/:callId/:resourceId',
            templateUrl: '/partials/project/create.html'
        })
        .state('call by id.evaluation', {
            url: '/call/:callId',
            templateUrl: '/partials/resource/raising_resource.html'
        })
        ;



    }
]);
