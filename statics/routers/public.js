/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app.router.public', [
    'app.service.tokens'
])

/*
/* */
.run(['$http', '$window', '$rootScope', '$state',
        function($http, $window, $rootScope, $state) {
    $rootScope.xAccessUser = {};
    $rootScope.putXAccessUser = function(user) {
        $window.localStorage['x-access-user'] = JSON.stringify(user);
        $rootScope.xAccessUser = JSON.parse(JSON.stringify(user));
    }
    if($window.localStorage['x-access-user']) {
        var xAccessUser = $window.localStorage['x-access-user'];
        $rootScope.xAccessUser = JSON.parse(xAccessUser);
    }
    if($window.localStorage['x-access-token']) {
        $http.defaults.headers.common['x-access-token'] =
            $window.localStorage['x-access-token'];
    }
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
        if(!toState.data || !toState.data.private) return;
        if(toState.data.privileged && !$rootScope.xAccessUser.isAdmin) {
            event.preventDefault(); $state.go('private'); }
        if(!$http.defaults.headers.common['x-access-token']) {
            event.preventDefault(); $state.go('public'); }
    });
}])


/*
/* */
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('public', {
            templateUrl: '/views/public.html',
            controller: ['$state', '$scope', '$timeout', '$$tokens',
                        function($state, $scope, $timeout, $$tokens) {
                // manage check in
                $scope.checkInStatus = '';
                $scope.checkIn = function(usermail) {
                    $scope.checkInStatus = 'checking in';
                    $$tokens.postUserActivity(
                        usermail, 'Checked In.'
                    ).then(function(user) {
                        $scope.checkInStatus = user.username + ' checked in';
                        $timeout(function(){ $scope.checkInStatus = '' }, 9000);
                    }).catch(function(message) {
                        $scope.checkInStatus = message;
                        $timeout(function(){ $scope.checkInStatus = '' }, 9000);
                    });
                };
                // manage check out
                $scope.checkOutStatus = '';
                $scope.checkOut = function(usermail) {
                    $scope.checkOutStatus = 'checking out';
                    $$tokens.postUserActivity(
                        usermail, 'Checked Out.'
                    ).then(function(user) {
                        $scope.checkOutStatus = user.username + ' checked out';
                        $timeout(function(){ $scope.checkOutStatus = '' }, 9000);
                    }).catch(function(message) {
                        $scope.checkOutStatus = message;
                        $timeout(function(){ $scope.checkOutStatus = '' }, 9000);
                    });
                };
            }]
        })
        .state('public.terms', {
            templateUrl: '/views/public/terms.html'
        })
        .state('public.privacy', {
            templateUrl: '/views/public/privacy.html'
        })
        .state('public.signin', {
            params: { signedOut:false },
            templateUrl: '/views/public/signin.html',
            controller: ['$http', '$window', '$state', '$stateParams',
                        '$rootScope', '$scope', '$$tokens',
                        function($http, $window, $state, $stateParams,
                        $rootScope, $scope, $$tokens) {
                $scope.signedOut = $stateParams.signedOut;
                $scope.signInStatus = '';
                $scope.signIn = function(usermail, password) {
                    $scope.signInStatus = 'signing in';
                    $$tokens.putUserToken(
                        usermail, password
                    ).then(function(userToken) {
                        $rootScope.xAccessUser = userToken[0];
                        $window.localStorage['x-access-user'] = JSON.stringify(userToken[0]);
                        $window.localStorage['x-access-token'] = userToken[1];
                        $http.defaults.headers.common['x-access-token'] = userToken[1];
                        $state.go('private');
                    }).catch(function(message) {
                        $scope.signInStatus = message;
                    });
                };
            }]
        })
        .state('public.signup', {
            templateUrl: '/views/public/signup.html',
            controller: ['$http', '$window', '$state', '$stateParams',
                        '$rootScope', '$scope', '$$tokens',
                        function($http, $window, $state, $stateParams,
                        $rootScope, $scope, $$tokens) {
                $scope.signUpStatus = '';
                $scope.signUp = function(username, email, password) {
                    $scope.signUpStatus = 'signing up';
                    $$tokens.postUserToken(
                        username, email, password
                    ).then(function(userToken) {
                        $rootScope.xAccessUser = userToken[0];
                        $window.localStorage['x-access-user'] = JSON.stringify(userToken[0]);
                        $window.localStorage['x-access-token'] = userToken[1];
                        $http.defaults.headers.common['x-access-token'] = userToken[1];
                        if($rootScope.xAccessUser.isAdmin) $state.go('admin.signup');
                        else $state.go('private');
                    }).catch(function(message) {
                        $scope.signUpStatus = message;
                    });
                };
            }]
        })
        .state('public.signout', {
            controller: ['$http', '$window', '$state', '$stateParams',
                        '$rootScope', '$scope', '$$tokens',
                        function($http, $window, $state, $stateParams,
                        $rootScope, $scope, $$tokens) {
                $$tokens.postUserActivity(
                    $rootScope.xAccessUser.username, 'Signed Out.'
                ).then(function() {
                    delete $rootScope.xAccessUser;
                    delete $window.localStorage['x-access-user'];
                    delete $window.localStorage['x-access-token'];
                    delete $http.defaults.headers.common['x-access-token'];
                    $state.go('public.signin', { signedOut:true });
                }).catch(function(message) {
                    $state.go('private');
                });
            }]
        })
        .state('public.recover', {
            templateUrl: '/views/public/recover.html',
            controller: ['$http', '$window', '$state', '$stateParams', '$scope', '$$tokens',
                        function($http, $window, $state, $stateParams, $scope, $$tokens) {
                $scope.recovered = false;
                $scope.recoverStatus = '';
                $scope.recover = function(usermail) {
                    $scope.recoverStatus = 'recovering';
                    $$tokens.recoverUserToken(
                        usermail
                    ).then(function(resetCode) {
                        console.log('fuck');
                        $stateParams.resetCode = resetCode;
                        $state.go('public.reset', $stateParams);
                    }).catch(function(message) {
                        $scope.recoverStatus = message;
                    });
                };
            }]
        })
        .state('public.reset', {
            url: '/passwordreset/{resetCode}/',
            templateUrl: '/views/public/reset.html',
            controller: ['$http', '$window', '$state', '$stateParams',
                        '$rootScope', '$scope', '$$tokens',
                        function($http, $window, $state, $stateParams,
                        $rootScope, $scope, $$tokens) {
                $scope.resetCode = $stateParams.resetCode;
                $scope.resetStatus = '';
                $scope.reset = function(password1, password2) {
                    $scope.resetStatus = 'resetting';
                    $$tokens.resetUserToken(
                        $scope.resetCode, password1, password2
                    ).then(function(userToken) {
                        $rootScope.xAccessUser = userToken[0];
                        $window.localStorage['x-access-user'] = JSON.stringify(userToken[0]);
                        $window.localStorage['x-access-token'] = userToken[1];
                        $http.defaults.headers.common['x-access-token'] = userToken[1];
                        $state.go('private');
                    }).catch(function(message) {
                        $scope.resetStatus = message;
                    });
                };
            }]
        });
}]);
