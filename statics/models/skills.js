/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app.model.skills', [
    'app.model.locals'
])

/*
/* */
.factory('$$$skills', ['$q', '$http', '$window', '$$$locals',
                    function($q, $http, $window, $$$locals) {
    /*
    /* */


    var subfactory = {};


    /*
    /* */


    var factory = {};


    /*
    /* */


    /// return skills
    factory.getSkills = function() {
        return $$$locals.getSkills();
    };

    /// return skills
    factory.putSkills = function(skills) {
        return $$$locals.putSkills(skills);
    };

    /// return skills
    factory.postSkills = function(title) {
        factory.postSkill(title);
        return $$$locals.getSkills();
    };

    /// return skills
    factory.deleteSkills = function(skill) {
        if(!skill) return $$$locals.putSkills([]);
        factory.deleteSkill(skill);
        return $$$locals.getSkills();
    };


    /*
    /* */


    /// return skill
    factory.getSkill = function(skillId) {
        var skills = $$$locals.getSkills();
        for(var i=0; i<skills.length; i++) {
            if(skills[i].id == skillId) {
                return skills[i];
            }
        }
        return null;
    };

    /// return skill
    factory.putSkill = function(skill) {
        var skills = $$$locals.getSkills();
        for(var i=0; i<skills.length; i++) {
            if(skills[i].id == skill.id) {
                skills[i] = skill;
                skills = $$$locals.putSkills(skills);
                return skills[i];
            }
        }
        return null;
    };

    /// return skill
    factory.postSkill = function(title) {
        var skillId = $$$locals.getNextSkillId();
        var skills = $$$locals.getSkills();
        skills.push({
            id:skillId, title:title,
            description:title + ' description',
            created:new Date(), updated:new Date()
        });
        skills = $$$locals.putSkills(skills);
        return skills[skills.length-1];
    };

    /// return skill
    factory.deleteSkill = function(skill) {
        var skills = $$$locals.getSkills();
        for(var i=0; i<skills.length; i++) {
            if(skills[i].id == skill.id) {
                skills.splice(i, 1);
                $$$locals.putSkills(skills);
                return skill;
            }
        }
        return null;
    };


    /*
    /* */


    return factory;


}]);
