'use strict';

angular
.module('bancameApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.router',
    'satellizer',
    'config',
    'ngTouch'
])
.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');


        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .state('campaign', {
            url: '/campaign',
            templateUrl: 'views/campaign_view.html'
        })
        .state('campaign-edit', {
            url: '/campaign/edit',
            templateUrl: 'views/campaign_edit.html'
        })
        .state('campaign-list', {
            url: '/campaigns',
            templateUrl: 'views/campaign_list.html'
        })
        .state('resource', {
            url: '/resource',
            templateUrl: 'views/resource_view.html'
        })
        .state('resource-edit', {
            url: '/resource/edit',
            templateUrl: 'views/resource_edit.html'
        })
        .state('resource-list', {
            url: '/resources',
            templateUrl: 'views/resource_list.html'
        })
        .state('faq', {
            url: '/faq',
            templateUrl: 'views/faq.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'views/contact.html'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'views/profile_view.html'
        })
        .state('profile-edit', {
            url: '/profile/edit',
            templateUrl: 'views/profile_edit.html'
        });

})
.config(function ($authProvider, api_host) {

    $authProvider.baseUrl = api_host+'/';
    $authProvider.httpInterceptor = true;

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
