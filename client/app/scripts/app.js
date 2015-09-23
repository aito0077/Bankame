'use strict';

angular
.module('bancameApp', [
//    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.router',
    'satellizer',
    'config',
    'ngFileUpload',
    'ngTouch'
])
.config(function ($locationProvider, $stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .state('user-view', {
            url: '/user/:callId',
            controller: 'user-view',
            templateUrl: 'views/user_view.html'
        })
        .state('user-signin', {
            url: '/login',
            controller: 'user-signin',
            templateUrl: 'views/user_login.html'
        })
        .state('user-signup', {
            url: '/signup',
            controller: 'user-signup',
            templateUrl: 'views/user_signup.html'
        })
        .state('campaign', {
            url: '/campaign/:callId',
            controller: 'call-view',
            templateUrl: 'views/campaign_view.html'
        })
        .state('campaign-edit', {
            url: '/campaign-edit',
            controller: 'call-edit',
            templateUrl: 'views/campaign_edit.html'
        })
        .state('campaign-list', {
            url: '/campaigns',
            controller: 'call-list',
            templateUrl: 'views/campaign_list.html'
        })
        .state('resource', {
            url: '/resource/:resourceId',
            controller: 'resource-view',
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

        function loginRequired($q, $location, $auth, $state) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                console.dir($state);
                $location.path('/signin');
            }
            return deferred.promise;
        }

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

    moment.locale('es');
    moment.tz.add('America/Argentina/Buenos_Aires|CMT ART ARST ART ARST|4g.M 40 30 30 20|0121212121212121212121212121212121212121213434343434343234343|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 g0p0 10M0 j3c0 uL0 1qN0 WL0');

})
.directive('isoGrid', function () {
    return function (scope, element, attrs) {
        scope.$watch(attrs.ngModel, function() {
            element.isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-sizer'
                }
            });
            console.log('isotop');
        });
    };
})
.filter('isPast', function() {
    return function(dateString) {
        return !moment().isAfter(dateString, 'day');
    };
})
.filter('leftdays', function() {
    return function(date) {
        return moment(date).locale('es').fromNow();
    };
})
.filter('moment', function() {
    return function(dateString, format) {
        return moment(dateString).locale('es').format(format);
    };
})
.filter('characters', function () {
    return function (input, chars, breakOnWord) {
        if (isNaN(chars)) return input;
        if (chars <= 0) return '';
        if (input && input.length > chars) {
            input = input.substring(0, chars);

            if (!breakOnWord) {
                var lastspace = input.lastIndexOf(' ');
                //get last space
                if (lastspace !== -1) {
                    input = input.substr(0, lastspace);
                }
            }else{
                while(input.charAt(input.length-1) === ' '){
                    input = input.substr(0, input.length -1);
                }
            }
            return input + '…';
        }
        return input;
    };
})
.filter('splitcharacters', function() {
    return function (input, chars) {
        if (isNaN(chars)) return input;
        if (chars <= 0) return '';
        if (input && input.length > chars) {
            var prefix = input.substring(0, chars/2);
            var postfix = input.substring(input.length-chars/2, input.length);
            return prefix + '...' + postfix;
        }
        return input;
    };
})
.filter('words', function () {
    return function (input, words) {
        if (isNaN(words)) return input;
        if (words <= 0) return '';
        if (input) {
            var inputWords = input.split(/\s+/);
            if (inputWords.length > words) {
                input = inputWords.slice(0, words).join(' ') + '…';
            }
        }
        return input;
    };
});
