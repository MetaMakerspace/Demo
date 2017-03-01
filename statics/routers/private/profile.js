/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app.router.private.profile', [
    'app.service.users'
])

/*
/* */
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('private.profile', {
            url:'profile/',
            data: { private:true },
            templateUrl: '/views/private/profile.html',
            controller: ['$state', '$stateParams', '$scope', '$$users',
                        function($state, $stateParams, $scope, $$users) {
                // manage avatar
                $scope.avatar = $scope.xAccessUser.avatar;
                $scope.avatarStatus = '';
                $scope.avatarUpdate = function() {
                    $scope.avatarStatus = 'updating';
                    $$users.putUserAvatar(
                        $scope.xAccessUser.id, $scope.avatarNew
                    ).then(function(user) {
                        $scope.avatarStatus = '';
                        $scope.putXAccessUser(user);
                        $scope.avatar = user.avatar;
                        $scope.avatarNew = '';
                    }).catch(function(message) {
                        $scope.avatarStatus = message;
                    });
                };
                // manage biography
                $scope.biography = $scope.xAccessUser.biography;
                $scope.biographyStatus = '';
                $scope.biographyUpdate = function() {
                    $scope.biographyStatus = 'updating';
                    $$users.putUserBiography(
                        $scope.xAccessUser.id, $scope.biography
                    ).then(function(user) {
                        $scope.biographyStatus = '';
                        $scope.putXAccessUser(user);
                        $scope.biography = user.biography;
                    }).catch(function(message) {
                        $scope.biographyStatus = message;
                    });
                };
                // manage username
                $scope.username = $scope.xAccessUser.username;
                // manage email
                $scope.emailOld = $scope.xAccessUser.email;
                $scope.emailStatus = '';
                $scope.emailUpdate = function() {
                    $scope.emailStatus = 'updating';
                    $$users.putUserEmail(
                        $scope.xAccessUser.id, $scope.emailOld,
                        $scope.emailNew, $scope.emailPassword
                    ).then(function(user) {
                        $scope.emailStatus = '';
                        $scope.putXAccessUser(user);
                        $scope.emailOld = user.email;
                        $scope.emailNew = '';
                        $scope.emailPassword = '';
                    }).catch(function(message) {
                        $scope.emailStatus = message;
                    })
                }
                // manage password
                $scope.passwordStatus = '';
                $scope.passwordUpdate = function() {
                    $scope.passwordStatus = 'updating';
                    $$users.putUserPassword(
                        $scope.xAccessUser.id, $scope.passwordOld,
                        $scope.passwordNew1, $scope.passwordNew2
                    ).then(function(user) {
                        $scope.passwordStatus = '';
                        $scope.putXAccessUser(user);
                        $scope.passwordOld = '';
                        $scope.passwordNew1 = '';
                        $scope.passwordNew2 = '';
                    }).catch(function(message) {
                        $scope.passwordStatus = message;
                    });
                };
            }]
        });
}]);
