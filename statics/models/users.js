/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app.model.users', [
    'app.model.locals'
])

/*
/* */
.factory('$$$users', ['$q', '$http', '$window', '$$$locals',
                    function($q, $http, $window, $$$locals) {
    /*
    /* */


    var subfactory = {};


    /*
    /* */


    var factory = {};


    /*
    /* */


    /// return users
    factory.getUsers = function() {
        return $$$locals.getUsers();
    };

    /// return users
    factory.postUsers = function(username, email, password) {
        factory.postUser(username, email, password);
        return $$$locals.getUsers();
    };

    /// return users
    factory.deleteUsers = function(userId) {
        if(!userId) return $$$locals.putUsers([]);
        factory.deleteUser(userId);
        return $$$locals.getUsers();
    };

    /// return users
    factory.populateUsers = function(users) {
        for(var i=0; i<users.length; i++) {
            factory.populateUser(users[i]); }
        return users;
    };


    /*
    /* */


    /// return user
    factory.getUser = function(userIdMail, password) {
        if(!password) return factory.getUserById(userIdMail);
        return factory.getUserByUsermail(userIdMail, password);
    };

    /// return user
    factory.getUserById = function(userId) {
        var users = $$$locals.getUsers();
        for(var i=0; i<users.length; i++) {
            if(users[i].id == userId) {
                return users[i];
            }
        }
        return null;
    };

    /// return user
    factory.getUserByUsermail = function(usermail, password) {
        var username, email, users = $$$locals.getUsers();
        for(var i=0; i<users.length; i++) {
            username = users[i].username;
            email = users[i].email;
            if(username == usermail || email == usermail) {
                if(users[i].password != password) return null;
                return users[i];
            }
        }
        return null;
    };

    /// return user
    factory.getUserByUsername = function(username) {
        var users = $$$locals.getUsers();
        for(var i=0; i<users.length; i++) {
            if(users[i].username == username) {
                return users[i];
            }
        }
        return null;
    };

    /// return user
    factory.getUserByEmail = function(email) {
        var users = $$$locals.getUsers();
        for(var i=0; i<users.length; i++) {
            if(users[i].email == email) {
                return users[i];
            }
        }
        return null;
    };


    /*
    /* */


    /// return user
    factory.postUser = function(username, email, password) {
        var users = $$$locals.getUsers();
        users.push({
            id:$$$locals.getNextUserId(), username:username,
            email:email, password:password,
            isAdmin:Boolean(!users.length),
            created:new Date(), updated:new Date(),
            biography:username + ' biography',
            reputation:0, reputationCount:0, avatar:'',
            attributes:[], skills:[], events:[], activities:[]
        });
        users = $$$locals.putUsers(users);
        return users[users.length-1];
    };

    /// return user
    factory.postUserActivity = function(userId, comment) {
        var users = $$$locals.getUsers();
        for(var i=0; i<users.length; i++) {
            if(users[i].id == userId) {
                if(!users[i].activities) {
                    users[i].activities = []; }
                users[i].activities.unshift({
                    comment:comment, created:new Date() });
                users = $$$locals.putUsers(users);
                return users[i];
            }
        }
        return null;
    };


    /*
    /* */


    /// return user
    factory.deleteUser = function(userId) {
        var users = $$$locals.getUsers();
        for(var i=0; i<users.length; i++) {
            if(users[i].id == userId) {
                users.splice(i, 1);
                $$$locals.putUsers(users);
                return user;
            }
        }
        return null;
    };


    /*
    /* */


    /// return user
    factory.putUserAvatar = function(userId, avatar) {
        var users = $$$locals.getUsers();
        for(var i=0; i<users.length; i++) {
            if(users[i].id == userId) {
                users[i].avatar = avatar;
                users = $$$locals.putUsers(users);
                return users[i];
            }
        }
        return null;
    };

    /// return user
    factory.putUserBiography = function(userId, biography) {
        var users = $$$locals.getUsers();
        for(var i=0; i<users.length; i++) {
            if(users[i].id == userId) {
                users[i].biography = biography;
                users = $$$locals.putUsers(users);
                return users[i];
            }
        }
        return null;
    };

    /// return user
    factory.putUserEmail = function(userId, email) {
        var users = $$$locals.getUsers();
        for(var i=0; i<users.length; i++) {
            if(users[i].id == userId) {
                users[i].email = email;
                users = $$$locals.putUsers(users);
                return users[i];
            }
        }
        return null;
    };

    /// return user
    factory.putUserPassword = function(userId, password) {
        var users = $$$locals.getUsers();
        for(var i=0; i<users.length; i++) {
            if(users[i].id == userId) {
                users[i].password = password;
                users = $$$locals.putUsers(users);
                return users[i];
            }
        }
        return null;
    };


    /*
    /* */

    /// return user
    factory.postUserEvent = function(userId, byUserId, comment, reputation,
                                    attributes, skills) {
        var users = $$$locals.getUsers(),
            byUser = factory.getUserById(byUserId);
        for(var i=0; i<users.length; i++) {
            if(users[i].id == userId) {
                subfactory.alterUserReputation(users[i], reputation);
                subfactory.alterUserAttributes(users[i], attributes);
                subfactory.alterUserSkills(users[i], skills);
                users[i].events.unshift({
                    id:$$$locals.getNextUserEventId(),
                    comment:comment, reputation:reputation,
                    attributes:attributes, skills:skills,
                    created:new Date(), updated:new Date(),
                    createdBy:{ id:byUser.id, username:byUser.username }
                });
                users = $$$locals.putUsers(users);
                return users[i];
            }
        };
        return null;
    };

    /// return user
    subfactory.alterUserReputation = function(user, reputation) {
        var sum = user.reputation * user.reputationCount;
        sum = 1*sum + 1*reputation;
        user.reputationCount++;
        user.reputation = sum / user.reputationCount;
        return user;
    };

    /// return user
    subfactory.alterUserAttributes = function(user, attributes) {
        if(!attributes) return user;
        var attrs = attributes.split(',');
        for(var i=0; i<attrs.length; i++) {
            attrs[i] = attrs[i].trim().split(':');
            if(attrs[i].length != 2) break;
            subfactory.alterUserAttribute(user,
                attrs[i][0].trim(), attrs[i][1].trim());
        }
        return user;
    };

    /// return user
    subfactory.alterUserAttribute = function(user, titleAbbreviation, delta) {
        var userAttr, attr, attrs = $$$locals.getAttributes();
        titleAbbreviation = titleAbbreviation.toUpperCase();
        for(var i=0; i<attrs.length; i++) {
            if(titleAbbreviation == attrs[i].title.toUpperCase()
            || titleAbbreviation == attrs[i].abbreviation) {
                attr = attrs[i];
            }
        }
        if(!attr) return user;
        for(var i=0; i<user.attributes.length; i++) {
            if(user.attributes[i].attributeId == attr.id) {
                userAttr = user.attributes[i];
            }
        }
        if(!userAttr) {
            userAttr = {
                id:$$$locals.getNextUserAttributeId(), attributeId:attr.id,
                level:0, levelProgress:0, levelGoal:100, levelPercent:0
            };
            user.attributes.push(userAttr);
        };
        userAttr.levelProgress += Math.round(delta);
        while(userAttr.levelProgress >= userAttr.levelGoal) {
            userAttr.level += 1;
            userAttr.levelProgress -= userAttr.levelGoal;
            userAttr.levelGoal += userAttr.levelGoal * .5;
            userAttr.levelGoal = Math.round(userAttr.levelGoal);
        }
        userAttr.levelPercent = userAttr.levelProgress / userAttr.levelGoal;
        userAttr.levelPercent = Math.round(userAttr.levelPercent * 100);
        return user;
    };

    /// return user
    subfactory.alterUserSkills = function(user, skills) {
        if(!skills) return user;
        var skills = skills.split(',');
        for(var i=0; i<skills.length; i++) {
            skills[i] = skills[i].trim().split(':');
            if(skills[i].length != 2) break;
            subfactory.alterUserSkill(user,
                skills[i][0].trim(), skills[i][1].trim());
        }
        return user;
    };

    /// return user
    subfactory.alterUserSkill = function(user, title, delta) {
        var userSkill, skill, skills = $$$locals.getSkills();
        title = title.toUpperCase();
        for(var i=0; i<skills.length; i++) {
            if(title == skills[i].title.toUpperCase()) {
                skill = skills[i];
            }
        }
        if(!skill) return user;
        for(var i=0; i<user.skills.length; i++) {
            if(user.skills[i].skillId == skill.id) {
                userSkill = user.skills[i];
            }
        }
        if(!userSkill) {
            userSkill = {
                id:$$$locals.getNextUserSkillId(), skillId:skill.id,
                level:0, levelProgress:0, levelGoal:100, levelPercent:0
            };
            user.skills.push(userSkill);
        };
        userSkill.levelProgress += Math.round(delta);
        while(userSkill.levelProgress >= userSkill.levelGoal) {
            userSkill.level += 1;
            userSkill.levelProgress -= userSkill.levelGoal;
            userSkill.levelGoal += userSkill.levelGoal * .5;
            userSkill.levelGoal = Math.round(userSkill.levelGoal);
        }
        userSkill.levelPercent = userSkill.levelProgress / userSkill.levelGoal;
        userSkill.levelPercent = Math.round(userSkill.levelPercent * 100);
        return user;
    };


    /*
    /* */


    /// return user
    factory.populateUser = function(user) {
        factory.populateUserAttributes(user);
        factory.populateUserSkills(user);
        return user;
    };

    /// return user
    factory.populateUserAttributes = function(user) {
        var userAttr, userAttrs = user.attributes,
            attr, attrs = $$$locals.getAttributes();
        for(var i=0; i<attrs.length; i++) {
            attr = attrs[i];
            userAttr = null;
            for(var j=0; j<userAttrs.length; j++) {
                if(userAttrs[j].attributeId == attr.id) {
                    userAttr = userAttrs[j];
                }
            }
            attr.attributeId = attr.id;
            attr.id = userAttr ? userAttr.id : 0;
            attr.level = userAttr ? userAttr.level : 0;
            attr.levelProgress = userAttr ? userAttr.levelProgress : 0;
            attr.levelGoal = userAttr ? userAttr.levelGoal : 100;
            attr.levelPercent = userAttr ? userAttr.levelPercent : 0;
        }
        user.attributes = attrs;
        return user;
    };

    /// return user
    factory.populateUserSkills = function(user) {
        var userSkill, userSkills = user.skills,
            skill, skills = $$$locals.getSkills(),
            mergedSkills = [];
        for(var i=0; i<skills.length; i++) {
            skill = skills[i];
            for(var j=0; j<userSkills.length; j++) {
                userSkill = userSkills[j];
                if(userSkill.skillId == skill.id) {
                    skill.skillId = skill.id;
                    skill.id = userSkill.id;
                    skill.level = userSkill.level;
                    skill.levelProgress = userSkill.levelProgress;
                    skill.levelGoal = userSkill.levelGoal;
                    skill.levelPercent = userSkill.levelPercent;
                    mergedSkills.push(skill);
                }
            }
        }
        user.skills = mergedSkills;
        return user;
    };


    /*
    /* */


    return factory;


}]);
