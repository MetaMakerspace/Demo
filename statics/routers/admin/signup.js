/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app.router.admin.signup', [
    'app.service.metas'
])

/*
/* */
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('admin.signup', {
            data: { private:true, admin:true },
            templateUrl: '/views/admin/signup.html',
            controller: ['$state', '$stateParams', '$scope', '$$metas',
                        function($state, $stateParams, $scope, $$metas) {
                // manage example
                $scope.exampleStatus = '';
                $scope.loadExampleDemo = function() {
                    $scope.exampleStatus = 'loading';
                    $$metas.restoreExampleDemo(
                    ).then(function(user) {
                        $scope.exampleStatus = '';
                        $scope.putXAccessUser(user);
                        $state.go('private');
                    }).catch(function(message) {
                        $scope.exampleStatus = message;
                    });
                };
                // manage blank
                $scope.blankStatus = '';
                $scope.loadBlankDemo = function() {
                    $state.go('admin');
                };
            }]
        });
}]);
