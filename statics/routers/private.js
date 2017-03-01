/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app.router.private', [
    'app.router.private.profile',
    'app.router.private.users',
    'app.service.events',
    'app.service.users'
])

/*
/* */
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('private', {
            url:'/', data: { private:true },
            templateUrl: '/views/private.html',
            controller: ['$state', '$stateParams', '$scope', '$$events', '$$users',
                        function($state, $stateParams, $scope, $$events, $$users) {
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
                // manage events
                $scope.events = [];
                $scope.eventsStatus = 'loading';
                $$events.getEvents(
                ).then(function(events) {
                    $scope.eventsStatus = '';
                    $scope.events = events;
                }).catch(function(message) {
                    $scope.eventsStatus = message;
                });
            }]
        });
}]);
