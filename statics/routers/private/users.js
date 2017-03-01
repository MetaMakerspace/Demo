/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app.router.private.users', [
    'app.service.users'
])

/*
/* */
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('private.users', {
            url:'users/',
            data: { private:true },
            templateUrl: '/views/private/users.html',
            controller: ['$state', '$stateParams', '$scope', '$$users',
                        function($state, $stateParams, $scope, $$users) {
                // manage users
                $scope.users = [];
                $scope.usersStatus = 'loading';
                $$users.getUsers(
                ).then(function(users) {
                    $scope.usersStatus = '';
                    $scope.users = users;
                }).catch(function(message) {
                    $scope.usersStatus = message;
                });
            }]
        })
        .state('private.user', {
            url:'users/{userId}/',
            data: { private:true },
            templateUrl: '/views/private/user.html',
            controller: ['$state', '$stateParams', '$scope', '$$users',
                        function($state, $stateParams, $scope, $$users) {
                // manage stars
                $scope.getStars = function(reputation) {
                    var stars = [];
                    for(var i=1; i<=5; i++) {
                        if(reputation >= i) stars[i] = 'star';
                        else if(i - reputation >= 1) stars[i] = 'star_border';
                        else if(i - reputation >= .75) stars[i] = 'star_border';
                        else if(i - reputation <= .25) stars[i] = 'star';
                        else stars[i] = 'star_half';
                    }
                    return stars;
                };
                // manage user
                $scope.user = {
                    username:'loading', biography:'loading', reputation:0
                };
                $scope.userStatus = 'loading';
                $$users.getUser(
                    $stateParams.userId
                ).then(function(user) {
                    $scope.userStatus = '';
                    $scope.user = user;
                }).catch(function(message) {
                    $scope.userStatus = message;
                });
                // manage events
                $scope.event = {};
                $scope.eventStatus = '';
                $scope.addEvent = function() {
                    $scope.eventStatus = 'adding';
                    $$users.postUserEvent(
                        $scope.user.id, $scope.xAccessUser.id,
                        $scope.event.comment, $scope.event.reputation,
                        $scope.event.attributes, $scope.event.skills
                    ).then(function(user) {
                        $scope.eventStatus = '';
                        $scope.event = {};
                        $scope.user = user;
                    }).catch(function(message) {
                        $scope.eventStatus = message;
                    });
                };
            }]
        });
}]);
