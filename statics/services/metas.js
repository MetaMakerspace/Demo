/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app.service.metas', [
    'app.model.metas'
])

/*
/* */
.factory('$$metas', ['$q', '$http', '$window', '$$$metas',
                    function($q, $http, $window, $$$metas) {
    /*
    /* */


    var factory = {};
    factory.delay = 0;


    /*
    /* */


    /// then(activities)
    /// catch(message)
    factory.getUsersActivities = function() {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var activities = $$$metas.getUsersActivities();
            return resolve(activities);
        }, factory.delay); });
    };

    /// then(user)
    /// catch(message)
    factory.restoreBlankDemo = function() {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var user = $$$metas.restoreBlankDemo();
            return resolve(user);
        }, factory.delay); });
    };

    /// then(user)
    /// catch(message)
    factory.restoreExampleDemo = function() {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var user = $$$metas.restoreExampleDemo();
            return resolve(user);
        }, factory.delay); });
    };


    /*
    /* */


    return factory;


}]);
