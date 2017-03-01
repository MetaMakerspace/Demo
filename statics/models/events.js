/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app.model.events', [
    'app.model.locals'
])

/*
/* */
.factory('$$$events', ['$q', '$http', '$window', '$$$locals',
                    function($q, $http, $window, $$$locals) {
    /*
    /* */


    var subfactory = {};


    /*
    /* */


    var factory = {};


    /*
    /* */


    /// return events
    factory.getEvents = function() {
        var event, events = [], users = $$$locals.getUsers();
        for(var i=0; i<users.length; i++) {
            for(var j=0; j<users[i].events.length; j++) {
                event = users[i].events[j];
                users[i].events[j].byUser = users[i].events[j].createdBy;
                users[i].events[j].toUser = {
                    id:users[i].id, username:users[i].username };
                events.unshift(users[i].events[j]);
            }
        }
        events.sort(function(a, b) {
            a = new Date(a.updated);
            b = new Date(b.updated);
            return a>b ? -1 : a<b ? 1 : 0;
        });
        return events;
    };


    /*
    /* */


    return factory;


}]);
