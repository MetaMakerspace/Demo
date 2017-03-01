/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app.service.events', [
    'app.model.events'
])

/*
/* */
.factory('$$events', ['$q', '$http', '$window', '$$$events',
                    function($q, $http, $window, $$$events) {
    /*
    /* */


    var factory = {};
    factory.delay = 0;


    /*
    /* */


    /// then(events)
    /// catch(message)
    factory.getEvents = function() {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var events = $$$events.getEvents();
            return resolve(events);
        }, factory.delay); });
    };


    /*
    /* */


    return factory;


}]);
