/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app.model.locals', [
])

/*
/* */
.factory('$$$locals', ['$q', '$http', '$window',
                    function($q, $http, $window) {
    /*
    /* */


    var foobar = {};


    /*
    /* */


    var factory = {};


    /*
    /* */


    /// return nextUserId
    factory.getNextUserId = function() {
        var nextUserId = $window.localStorage['users.nextUserId'];
        if(!nextUserId) nextUserId = 123456789;
        $window.localStorage['users.nextUserId'] = nextUserId + 1;
        return nextUserId;
    };

    /// return nextUserAttributeId
    factory.getNextUserAttributeId = function() {
        var nextUserAttrId = $window.localStorage['users.nextAttributeId'];
        if(!nextUserAttrId) nextUserAttrId = 123456789;
        $window.localStorage['users.nextAttributeId'] = nextUserAttrId + 1;
        return nextUserAttrId;
    };

    /// return nextUserSkillId
    factory.getNextUserSkillId = function() {
        var nextUserSkillId = $window.localStorage['users.nextSkillId'];
        if(!nextUserSkillId) nextUserSkillId = 123456789;
        $window.localStorage['users.nextSkillId'] = nextUserSkillId + 1;
        return nextUserSkillId;
    };

    /// return nextUserEventId
    factory.getNextUserEventId = function() {
        var nextUserEventId = $window.localStorage['users.nextEventId'];
        if(!nextUserEventId) nextUserEventId = 123456789;
        $window.localStorage['users.nextEventId'] = nextUserEventId + 1;
        return nextUserEventId;
    };

    /// return nextAttributeId
    factory.getNextAttributeId = function() {
        var nextAttrId = $window.localStorage['attrs.nextAttributeId'];
        if(!nextAttrId) nextAttrId = 123456789;
        $window.localStorage['attrs.nextAttributeId'] = nextAttrId + 1;
        return nextAttrId;
    };

    /// return nextSkillId
    factory.getNextSkillId = function() {
        var nextSkillId = $window.localStorage['skills.nextSkillId'];
        if(!nextSkillId) nextSkillId = 123456789;
        $window.localStorage['skills.nextSkillId'] = nextSkillId + 1;
        return nextSkillId;
    };


    /*
    /* */


    /// return users
    factory.getUsers = function() {
        if(!$window.localStorage['users.users']) return [];
        return JSON.parse($window.localStorage['users.users']);
    };

    /// return users
    factory.putUsers = function(users) {
        $window.localStorage['users.users'] = JSON.stringify(users);
        return JSON.parse($window.localStorage['users.users']);
    };


    /*
    /* */


    /// return attributes
    factory.getAttributes = function() {
        if(!$window.localStorage['attrs.attributes']) return [];
        return JSON.parse($window.localStorage['attrs.attributes']);
    };

    /// return attributes
    factory.putAttributes = function(attributes) {
        $window.localStorage['attrs.attributes'] = JSON.stringify(attributes);
        return JSON.parse($window.localStorage['attrs.attributes']);
    };


    /*
    /* */


    /// return skills
    factory.getSkills = function() {
        if(!$window.localStorage['skills.skills']) return [];
        return JSON.parse($window.localStorage['skills.skills']);
    };

    /// return skills
    factory.putSkills = function(skills) {
        $window.localStorage['skills.skills'] = JSON.stringify(skills);
        return JSON.parse($window.localStorage['skills.skills']);
    };


    /*
    /* */


    return factory;


}]);
