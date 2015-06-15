'use strict';
/* global jQuery:true */

angular.element(document).ready(function() {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_') window.location.hash = '#!';

  //Then init the app
  angular.bootstrap(document, ['mean']);

});

function processModules(modules) {
    var packageModules = [
        'ngResource', 
        'satellizer',
        'ui.bootstrap', 
        'mgcrea.ngStrap', 
        'ui.router',
        'ngFileUpload',
        ], m, mn;
    for (var index in modules) {
        m = modules[index];
        mn = 'mean.'+m.name;
        angular.module(mn, m.angularDependencies || []);
        packageModules.push(mn);
    }

    angular.module('mean', packageModules)
    .config(function($stateProvider, $urlRouterProvider, $authProvider) {
        $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: './partials/users/login.html',
            controller: 'LoginCtrl'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: './partials/users/signup.html',
            controller: 'SignupCtrl'
        })
        .state('logout', {
            url: '/logout',
            template: null,
            controller: 'LogoutCtrl'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: './partials/users/profile.html',
            controller: 'ProfileCtrl',
            resolve: {
                authenticated: function($q, $location, $auth) {
                    var deferred = $q.defer();
                    if (!$auth.isAuthenticated()) {
                        $location.path('/login');
                    } else {
                        deferred.resolve();
                    }
                    return deferred.promise;
                }
            }
        });

        $authProvider.facebook({
            clientId: '1082199191794840',
            scope: 'email,public_profile'

        });

        $authProvider.google({
            clientId: '313110710680-p22p1s5brqn7tfaqj9v16u67bic5smqk.apps.googleusercontent.com'
        });

        $authProvider.yahoo({
            clientId: 'dj0yJmk9SDVkM2RhNWJSc2ZBJmQ9WVdrOWIzVlFRMWxzTXpZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yYw--'
        });

        $authProvider.twitter({
            url: '/auth/twitter'
        });
    });
}

jQuery.ajax('/_getModules', {
  dataType: 'json',
  async:false,
  success: processModules
});
