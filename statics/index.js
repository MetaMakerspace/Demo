/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app', [
    'ui.router',
    'ngAnimate',
    'hc.marked',
    'app.router.public',
    'app.router.private',
    'app.router.admin'
])

/*
/* */
.config(['$locationProvider', '$urlRouterProvider',
        function($locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.url();
        if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) {
            return; }
        if (path.indexOf('?') > -1) {
            return path.replace('?', '/?'); }
        return path + '/';
    });
}])

/*
/* */
.run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateNotFound', function(event, toState) {
        console.log('?? %s', toState.name);
    });
    $rootScope.$on('$stateChangeError', function(event, toState, toParams) {
        console.log('!! %s', toState.name);
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams) {
        console.log('>> %s', toState.name);
    });
}]);
