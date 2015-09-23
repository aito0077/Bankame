'use strict';

/**
 * @ngdoc function
 * @name bancameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bancameApp
 */
angular.module('bancameApp')
.controller('MainCtrl', function ($scope, $timeout, $http, $rootScope, $state) {

    $scope.setup_components = function() {

        $timeout(function() {

            $('.nav li, .nav li').on({
                mouseenter: function() {
                    $(this).children('ul').stop(true, true).slideDown(400);
                },
                mouseleave: function() {
                    $(this).children('ul').slideUp(100);
                }
            });
        
        
            /* BX slider 1*/
            var bannerslider = $('#banner_slider');
            if (bannerslider.length) {
                bannerslider.bxSlider({ auto: true, minSlides: 1, maxSlides: 1, slideMargin: 18, speed: 500 });
            }


            var newslider = $('#news_slider');
            if (newslider.length) {
                newslider.bxSlider({ minSlides: 1, maxSlides: 1, slideMargin: 18, speed: 500 });
            }
            var videoslider = $('.video_slider');
            if (videoslider.length) {
                videoslider.bxSlider({ minSlides: 1, maxSlides: 1, slideMargin: 25, speed: 500, });
            }
            var blogslider = $('#blog_slider');
            if (blogslider.length) {
                blogslider.bxSlider({ minSlides: 1, maxSlides: 1 });
            }
            var shopslider = $('#shop_slider');
            if (shopslider.length) {
                shopslider.bxSlider({ slideWidth: 140,minSlides: 1, maxSlides: 3, slideMargin: 28 });
            }
            var officeslider = $('#office_slider');
            if (officeslider.length) {
                officeslider.bxSlider({ slideWidth: 270, minSlides: 1, maxSlides: 4, slideMargin: 28 });
            }
            var productslider = $('#slider_products');
            if (productslider.length) {
               productslider.bxSlider({ slideWidth: 270, minSlides: 1, maxSlides: 1, slideMargin: 10 });
            }

            /* bootstrap Add class to accordion **/
            var sidebar = $('.accordion-heading'); /* cache sidebar to a variable for performance */
            sidebar.delegate('.accordion-toggle', 'click', function () {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    $(this).addClass('inactive');
                    $("#icon_toggle i", this).removeClass('icon-minus').addClass('icon-plus');
                } else {
                    sidebar.find('.active').addClass('inactive');
                    sidebar.find('.active').removeClass('active');
                    $(this).removeClass('inactive');
                    $(this).addClass('active');
                    $("#icon_toggle i", this).removeClass('icon-plus').addClass('icon-minus');
                }
            });
            /* End of bootstrap Add class to accordion **/

            /* Footer Gallery Pretty Photo Widget **/
            $(".gallery-list:first a[data-rel^='prettyPhoto']").prettyPhoto({ animation_speed: 'normal', theme: 'light_square', slideshow: 3000, autoplay_slideshow: true });
            /* End of Footer Gallery Pretty Photo Widget **/
            
            /* Start of Photo Gallery Pretty Photo **/
            $(".gallery-page:first a[data-rel^='prettyPhoto']").prettyPhoto({animation_speed: 'normal',theme: 'light_square', slideshow: 3000, autoplay_slideshow: true });
            /* End of Photo Gallery Pretty Photo **/
            
            /* Social Icons **/
            $('.social_active').hoverdir({});
            /* End of Social Icons Animation **/

            /* Start of Counter */
            var austDay = new Date();
            austDay = new Date($scope.next_call.end_date);

            $('#countdown162').countdown({
                until: austDay
            });
            $('#year').text(austDay.getFullYear());	    
            /* End of Counter */
            
             /* Bootstrap Tooltip */
            /*
             $("a[data-rel='tooltip']").tooltip();
            */
             /* Bootstrap Tooltip */
         
        });


    };


    $scope.active_calls = [];
    $scope.next_call = {};
    $scope.star_call = {};
    $scope.remark_campaign = {};
    $scope.promoted_calls = [];

    $http.get('/api/calls/summary').success(function(data) {
        $scope.active_calls = data.active_calls;
        $scope.next_call = data.next_call;
        $rootScope.next_call = $scope.next_call;
        if(data.promoted_calls && data.promoted_calls.length > 0) {
            $scope.remark_campaign = data.promoted_calls.slice(0,1)[0];
        }
        if(data.promoted_calls && data.promoted_calls.length > 1) {
            $scope.promoted_calls = data.promoted_calls.slice(1);
        }
        $scope.setup_components();
    });

    $scope.view = function(call_item) {
        $state.go('campaign', {
            callId: call_item.id
        });
    };
    

})
.controller('NavController', function ($scope, $rootScope, $state, $location, $auth, $window, Account) {

    $scope.profile = false;
    $scope.is_logged = false;

    $rootScope.$on('is_logged',function(event, logged){
        $scope.is_logged = logged;
        if(logged) {
            if(!$scope.fetching_profile && !$scope.profile) {
                $scope.fetching_profile = true;
                Account.getProfile().then(function(response) {
                    $scope.fetching_profile = false;
                    $scope.profile = response.data.profile;
                    $rootScope.account = $scope.profile;
                });
            }
        } else {
            $rootScope.account = {};
        }

    });


    
    $scope.isAuthenticated = function() {
        var is_authenticated = $auth.isAuthenticated();

        if(!$scope.fetching_profile && !$scope.profile && is_authenticated) {
            $scope.fetching_profile = true;
            Account.getProfile().then(function(response) {
                $scope.fetching_profile = false;
                $scope.profile = response.data.user;
                $rootScope.$broadcast('is_logged', true);
            }).catch(function(response) {
                $auth.logout().then(function() {
                    $rootScope.$broadcast('is_logged', false);
                });
            });
        }

        return is_authenticated;
    };


    $scope.fetching_profile = false;

    $scope.getProfile = function() {
        var is_authenticated = $auth.isAuthenticated();
        return $scope.profile;
    };

    $scope.goProfile = function() {
        $state.go('profile');
    };

    $scope.isAuthenticated();

})
.controller('ContactController', function ($scope, $timeout, $http, Contact) {
    $scope.contact = new Contact(); 
    $scope.is_sent = false;

    $scope.send_contact = function() {
        $scope.contact.$save(function(response) {
            $scope.is_sent = true; 
            $scope.contact = new Contact();
        });
    };
});
