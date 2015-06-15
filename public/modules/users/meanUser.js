'use strict';

angular.module('mean.users')
    .controller('AuthCtrl', ['$scope', '$rootScope', '$http', '$location', 'Global', function($scope, $rootScope, $http, $location, Global) {
        $scope.socialButtonsCounter = 0;
        $scope.global = Global;

    } ])
    .controller('LoginCtrl', ['$scope', '$rootScope', '$http', '$location', '$alert', '$auth', 'Global',
        function($scope, $rootScope, $http, $location, $alert, $auth, Global) {
            $scope.user = {};
            $scope.global = Global;
            $scope.global.registerForm = false;
            $scope.input = {
                type: 'password',
                placeholder: 'Password',
                confirmPlaceholder: 'Repeat Password',
                iconClass: '',
                tooltipText: 'Show password'
            };

            $scope.togglePasswordVisible = function() {
                $scope.input.type = $scope.input.type === 'text' ? 'password' : 'text';
                $scope.input.placeholder = $scope.input.placeholder === 'Password' ? 'Visible Password' : 'Password';
                $scope.input.iconClass = $scope.input.iconClass === 'icon_hide_password' ? '' : 'icon_hide_password';
                $scope.input.tooltipText = $scope.input.tooltipText === 'Show password' ? 'Hide password' : 'Show password';
            };

            $scope.login = function() {
                $auth.login({ email: $scope.email, password: $scope.password })
                .then(function() {
                    $http.get('/api/me').success(function(response) {
                        $scope.loginError = 0;
                        console.dir(response);
                        $rootScope.user = response.user;
                        $rootScope.$emit('loggedin');

                        if (response.redirect) {
                            window.location = response.redirect;
                        } else {
                            $location.url('/');
                        }
                    });

                })
                .catch(function(response) {
                    $alert({
                        content: response.data.message,
                        animation: 'fadeZoomFadeDown',
                        type: 'material',
                        duration: 3
                    });
                });
            };
            $scope.authenticate = function(provider) {
                $auth.authenticate(provider)
                .then(function() {
                    $alert({
                        content: 'You have successfully logged in',
                        animation: 'fadeZoomFadeDown',
                        type: 'material',
                        duration: 3
                    });
                })
                .catch(function(response) {
                    $alert({
                        content: response.data ? response.data.message : response,
                        animation: 'fadeZoomFadeDown',
                        type: 'material',
                        duration: 3
                    });
                });
            };


/*
      // Register the login() function
      $scope.login = function() {
        $http.post('/login', {
          email: $scope.user.email,
          password: $scope.user.password
        })
          .success(function(data) {
            // authentication OK
            $scope.loginError = 0;
            $http.get('/api/me').sucess(function(response) {
                console.dir(response);
                $rootScope.user = response.user;
                $rootScope.$emit('loggedin');

                if (response.redirect) {
                  if (window.location.href === response.redirect) {
                    //This is so an admin user will get full admin page
                    window.location.reload();
                  } else {
                    window.location = response.redirect;
                  }
                } else {
                  $location.url('/');
                }

            });
            

          })
          .error(function() {
            $scope.loginerror = 'Authentication failed.';
          });
      };
*/
    }
  ])
    .controller('RegisterCtrl', ['$scope', '$rootScope', '$http', '$location', '$alert', '$auth', 'Global', function($scope, $rootScope, $http, $location, $alert, $auth, Global) {
        $scope.user = {};
        $scope.global = Global;
        $scope.global.registerForm = true;
        $scope.input = {
            type: 'password',
            placeholder: 'Clave',
            placeholderConfirmPass: 'Repetir Clave',
            iconClassConfirmPass: '',
            tooltipText: 'Mostrar Clave',
            tooltipTextConfirmPass: 'Mostrar Clave'
        };

        $scope.togglePasswordVisible = function() {
            $scope.input.type = $scope.input.type === 'text' ? 'password' : 'text';
            $scope.input.placeholder = $scope.input.placeholder === 'Password' ? 'Visible Password' : 'Password';
            $scope.input.iconClass = $scope.input.iconClass === 'icon_hide_password' ? '' : 'icon_hide_password';
            $scope.input.tooltipText = $scope.input.tooltipText === 'Show password' ? 'Hide password' : 'Show password';
        };

        $scope.togglePasswordConfirmVisible = function() {
            $scope.input.type = $scope.input.type === 'text' ? 'password' : 'text';
            $scope.input.placeholderConfirmPass = $scope.input.placeholderConfirmPass === 'Repeat Password' ? 'Visible Password' : 'Repeat Password';
            $scope.input.iconClassConfirmPass = $scope.input.iconClassConfirmPass === 'icon_hide_password' ? '' : 'icon_hide_password';
            $scope.input.tooltipTextConfirmPass = $scope.input.tooltipTextConfirmPass === 'Show password' ? 'Hide password' : 'Show password';
        };

        $scope.signup = function() {
            $auth.signup({
                username: $scope.username,
                email: $scope.email,
                password: $scope.password,
                name: $scope.name,
                language_code: 'ES' //ToDo: Obtener del sitio
            }).catch(function(response) {
                if (typeof response.data.message === 'object') {
                    angular.forEach(response.data.message, function(message) {
                        $alert({
                            content: message[0],
                            animation: 'fadeZoomFadeDown',
                            type: 'material',
                            duration: 3
                        });
                    });
                } else {
                    // authentication OK
                    $scope.registerError = 0;
                    $rootScope.user = $scope.user;
                    Global.user = $rootScope.user;
                    Global.authenticated = !! $rootScope.user;
                    $rootScope.$emit('loggedin');
                    $location.url('/')
                }
            });
        };



/*
  $scope.register = function() {
    $scope.usernameError = null;
    $scope.registerError = null;
    $http.post('/register', {
      email: $scope.user.email,
      password: $scope.user.password,
      confirmPassword: $scope.user.confirmPassword,
      username: $scope.user.username,
      name: $scope.user.name
    })
      .success(function() {
        // authentication OK
        $scope.registerError = 0;
        $rootScope.user = $scope.user;
        Global.user = $rootScope.user;
        Global.authenticated = !! $rootScope.user;
        $rootScope.$emit('loggedin');
        $location.url('/');
      })
      .error(function(error) {
        // Error: authentication failed
        if (error === 'Username already taken') {
          $scope.usernameError = error;
        } else if (error === 'Email already taken') {
          $scope.emailError = error;
        } else $scope.registerError = error;
      });
  };
    */
    }
  ])
  .controller('ForgotPasswordCtrl', ['$scope', '$rootScope', '$http', '$location', 'Global',
    function($scope, $rootScope, $http, $location, Global) {
      $scope.user = {};
      $scope.global = Global;
      $scope.global.registerForm = false;
      $scope.forgotpassword = function() {
        $http.post('/forgot-password', {
          text: $scope.user.email
        })
          .success(function(response) {
            $scope.response = response;
          })
          .error(function(error) {
            $scope.response = error;
          });
      };
    }
  ])
  .controller('ResetPasswordCtrl', ['$scope', '$rootScope', '$http', '$location', '$stateParams', 'Global',
    function($scope, $rootScope, $http, $location, $stateParams, Global) {
      $scope.user = {};
      $scope.global = Global;
      $scope.global.registerForm = false;
      $scope.resetpassword = function() {
        $http.post('/reset/' + $stateParams.tokenId, {
          password: $scope.user.password,
          confirmPassword: $scope.user.confirmPassword
        })
          .success(function(response) {
            $rootScope.user = response.user;
            $rootScope.$emit('loggedin');
            if (response.redirect) {
              if (window.location.href === response.redirect) {
                //This is so an admin user will get full admin page
                window.location.reload();
              } else {
                window.location = response.redirect;
              }
            } else {
              $location.url('/');
            }
          })
          .error(function(error) {
            if (error.msg === 'Token invalid or expired')
              $scope.resetpassworderror = 'Could not update password as token is invalid or may have expired';
            else
              $scope.validationError = error;
          });
      };
    }
  ]);
