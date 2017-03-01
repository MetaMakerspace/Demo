/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app.router.admin.logs', [
    'app.service.metas'
])

/*
/* */
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('admin.logs', {
            url: 'logs/',
            data: { private:true, admin:true },
            templateUrl: '/views/admin/logs.html',
            controller: ['$state', '$stateParams', '$scope', '$$metas',
                        function($state, $stateParams, $scope, $$metas) {
                // manage example
                $scope.activitiesStatus = 'loading';
                $$metas.getUsersActivities(
                ).then(function(activities) {
                    $scope.activitiesStatus = '';
                    $scope.activities = activities;
                }).catch(function(message) {
                    $scope.activitiesStatus = message;
                });
            }]
        });
}]);
