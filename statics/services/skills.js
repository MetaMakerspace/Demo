/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app.service.skills', [
    'app.model.skills'
])

/*
/* */
.factory('$$skills', ['$q', '$http', '$window', '$$$skills',
                    function($q, $http, $window, $$$skills) {
    /*
    /* */


    var factory = {};
    factory.delay = 0;


    /*
    /* */


    /// then(skills)
    /// catch(message)
    factory.getSkills = function() {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var skills = $$$skills.getSkills();
            return resolve(skills);
        }, factory.delay); });
    };

    /// then(skills)
    /// catch(message)
    factory.postSkills = function(title) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var skills = $$$skills.postSkills(title);
            if(!skills) return reject('server error');
            return resolve(skills);
        }, factory.delay); });
    };

    /// then(skills)
    /// catch(message)
    factory.deleteSkills = function(skillId) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var skill = $$$skills.getSkill(skillId);
            if(!skill) return reject('invalid skill');
            var skills = $$$skills.deleteSkills(skill);
            if(!skills) return reject('server error');
            return resolve(skills);
        }, factory.delay); });
    };


    /*
    /* */


    /// then(skill)
    /// catch(message)
    factory.getSkill = function(skillId) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var skill = $$$skills.getSkill(skillId);
            if(!skill) return reject('invalid skill');
            return resolve(skill);
        }, factory.delay); });
    };

    /// then(skill)
    /// catch(message)
    factory.putSkill = function(skill) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var skill = $$$skills.putSkill(skill);
            if(!skill) return reject('invalid skill');
            return resolve(skill);
        }, factory.delay); });
    };

    /// then(skill)
    /// catch(message)
    factory.deleteSkill = function(skillId) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var skill = $$$skills.getSkill(skillId);
            if(!skill) return reject('invalid skill');
            skill = $$$skills.deleteSkill(skill);
            if(!skill) return reject('server error');
            return resolve(skill);
        }, factory.delay); });
    };


    /*
    /* */


    return factory;


}]);
