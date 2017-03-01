/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app.model.metas', [
    'app.model.locals',
    'app.model.users'
])

/*
/* */
.factory('$$$metas', ['$q', '$http', '$window', '$$$locals', '$$$users',
                    function($q, $http, $window, $$$locals, $$$users) {
    /*
    /* */


    var subfactory = {};

    ///
    subfactory.bios = {
        lovelace:"An English mathematician and writer, chiefly known for her work on Charles Babbage's early mechanical general-purpose computer, the Analytical Engine. Her notes on the engine include what is recognised as the first algorithm intended to be carried out by a machine. As a result, she is often regarded as the first computer programmer.",
        nyquist:"A Swedish born American electronic engineer who made important contributions to communication theory. The Nyquist stability criterion can now be found in all textbooks on feedback control theory.",
        planck:"A German theoretical physicist whose work on quantum theory won him the Nobel Prize in Physics. Planck made many contributions to theoretical physics, but his fame as a physicist rests primarily on his role as an originator of quantum theory, which revolutionized human understanding of atomic and subatomic processes.",
        pasteur:"a French chemist and microbiologist renowned for his discoveries of the principles of vaccination, microbial fermentation and pasteurization. He is remembered for his remarkable breakthroughs in the causes and prevention of diseases, and his discoveries have saved countless lives ever since. His medical discoveries provided direct support for the germ theory of disease and its application in clinical medicine. He is best known to the general public for his invention of the technique of treating milk and wine to stop bacterial contamination, a process now called pasteurization."
    };
    subfactory.avatars = {
        lovelace:'http://68.media.tumblr.com/4996f58e600f03ec2c6181e3899f4d3f/tumblr_mje2p6zRcx1rx06nvo1_500.jpg',
        nyquist:'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Harry_Nyquist.jpg/200px-Harry_Nyquist.jpg',
        planck:'http://www.esa.int/var/esa/storage/images/esa_multimedia/images/2004/07/max_planck_1858-1947/10025837-2-eng-GB/Max_Planck_1858-1947_medium.jpg',
        pasteur:'https://pbs.twimg.com/profile_images/551473438116687872/zoqSJtWK.jpeg'
    };

    /// return user
    subfactory.getCleanAdminUser = function() {
        var users = $$$locals.getUsers(),
            admin = users[0];
        return {
            id:1234567890, username:admin.username,
            email:admin.email, password:admin.password,
            isAdmin:admin.isAdmin, biography:admin.biography,
            created:admin.created, updated:admin.updated,
            reputation:0, reputationCount:0, avatar:admin.avatar,
            activities:[], attributes:[], skills:[], events:[]
        };
    };

    /// return attributes
    subfactory.getExampleAttributes = function() {
        return [
            {id:1234567890, title:'Intelligence', created:new Date(),
            abbreviation:'INT', description:'', updated:new Date()},
            {id:1234567891, title:'Wisdom', created:new Date(),
            abbreviation:'WIS', description:'', updated:new Date()},
            {id:1234567892, title:'Strength', created:new Date(),
            abbreviation:'STR', description:'', updated:new Date()},
            {id:1234567893, title:'Charisma', created:new Date(),
            abbreviation:'CHA', description:'', updated:new Date()},
            {id:1234567894, title:'Luck', created:new Date(),
            abbreviation:'LUC', description:'', updated:new Date()},
        ];
    };

    /// return skills
    subfactory.getExampleSkills = function() {
        return [
            {id:1234567890, title:'Welding',
            description:'', created:new Date(), updated:new Date()},
            {id:1234567891, title:'Soldering',
            description:'', created:new Date(), updated:new Date()},
            {id:1234567892, title:'Hacking',
            description:'', created:new Date(), updated:new Date()},
            {id:1234567893, title:'Milling',
            description:'', created:new Date(), updated:new Date()},
            {id:1234567894, title:'Printing',
            description:'', created:new Date(), updated:new Date()},
        ];
    };

    /// return users
    subfactory.getExampleUsers = function(admin) {
        var users = [admin];
        users.push({
            id:1234567891, username:'lovelace',
            email:'ada@lovelace.com', password:'lovelace',
            isAdmin:false, biography:subfactory.bios.lovelace,
            created:new Date(), updated:new Date(),
            reputation:0, reputationCount:0, activities:[],
            attributes:[], skills:[], events:[],
            avatar:subfactory.avatars.lovelace
        });
        users.push({
            id:1234567892, username:'nyquist',
            email:'harry@nyquist.com', password:'nyquist',
            isAdmin:false, biography:subfactory.bios.nyquist,
            created:new Date(), updated:new Date(),
            reputation:0, reputationCount:0, activities:[],
            attributes:[], skills:[], events:[],
            avatar:subfactory.avatars.nyquist
        });
        users.push({
            id:1234567893, username:'planck',
            email:'max@planck.com', password:'planck',
            isAdmin:false, biography:subfactory.bios.planck,
            created:new Date(), updated:new Date(),
            reputation:0, reputationCount:0, activities:[],
            attributes:[], skills:[], events:[],
            avatar:subfactory.avatars.planck
        });
        users.push({
            id:1234567894, username:'pasteur',
            email:'louis@pasteur.com', password:'pasteur',
            isAdmin:false, biography:subfactory.bios.pasteur,
            created:new Date(), updated:new Date(),
            reputation:0, reputationCount:0, activities:[],
            attributes:[], skills:[], events:[],
            avatar:subfactory.avatars.pasteur
        });
        return users;
    };


    /*
    /* */


    var factory = {};


    /*
    /* */


    /// return attributes
    factory.getUsersActivities = function() {
        var users = $$$locals.getUsers(),
            activity, activities = [];
        for(var i=0; i<users.length; i++) {
            for(var j=0; j<users[i].activities.length; j++) {
                activity = users[i].activities[j];
                activity.byUser = {
                    id:users[i].id, username:users[i].username };
                activities.push(activity);
            }
        }
        activities.sort(function(a, b) {
            a = new Date(a.created);
            b = new Date(b.created);
            return a>b ? -1 : a<b ? 1 : 0;
        });
        return activities;
    };

    /// return user
    factory.restoreBlankDemo = function() {
        var users, admin = subfactory.getCleanAdminUser();
        $$$locals.putAttributes([]);
        $$$locals.putSkills([]);
        users = $$$locals.putUsers([admin]);
        $$$users.postUserActivity(users[0].id, 'Signed In.');
        return users[0];
    };

    /// return user
    factory.restoreExampleDemo = function() {
        var users, admin = subfactory.getCleanAdminUser();
        $$$locals.putAttributes(subfactory.getExampleAttributes());
        $$$locals.putSkills(subfactory.getExampleSkills());
        users = $$$locals.putUsers(subfactory.getExampleUsers(admin));
        //
        $$$users.postUserActivity(users[0].id, 'Signed In.');
        $$$users.postUserEvent(users[1].id, users[0].id,
            'Welcome ' + users[1].username + '! Assessment Results.', 3.5,
            'INT:2500, WIS:1500, STR:3000, CHA:1000, LUC:500');
        $$$users.postUserEvent(users[1].id, users[0].id,
            'Made a custom nameplate.', 3.8,
            'INT:100', 'Milling:500, Printing:300');
        $$$users.postUserEvent(users[2].id, users[0].id,
            'Welcome ' + users[2].username + '! Assessment Results.', 4.2,
            'INT:3500, WIS:2500, STR:1000, CHA:1500, LUC:750');
        $$$users.postUserActivity(users[0].id, 'Signed Out.');
        //
        $$$users.postUserActivity(users[1].id, 'Checked In.');
        $$$users.postUserActivity(users[2].id, 'Checked In.');
        //
        $$$users.postUserActivity(users[1].id, 'Signed In.');
        $$$users.postUserEvent(users[2].id, users[1].id,
            'Printed a custom action figure.', 4.8,
            'INT:100, WIS:200', 'Hacking:300, Printing:600');
        $$$users.postUserActivity(users[1].id, 'Signed Out.');
        //
        $$$users.postUserActivity(users[2].id, 'Signed In.');
        $$$users.postUserEvent(users[1].id, users[2].id,
            'Designed the door sign.', 2.8,
            'CHA:500', 'Milling:700, Printing:100, Welding:250');
        $$$users.postUserActivity(users[2].id, 'Signed Out.');
        //
        $$$users.postUserActivity(users[1].id, 'Checked Out.');
        $$$users.postUserActivity(users[2].id, 'Checked Out.');
        //
        $$$users.postUserActivity(users[0].id, 'Signed In.');
        $$$users.postUserEvent(users[3].id, users[0].id,
            'Welcome ' + users[3].username + '! Assessment Results.', 2.8,
            'INT:1500, WIS:1000, STR:3500, CHA:2500, LUC:1500');
        $$$users.postUserActivity(users[0].id, 'Signed Out.');
        //
        $$$users.postUserActivity(users[0].id, 'Checked In.');
        $$$users.postUserActivity(users[3].id, 'Checked In.');
        $$$users.postUserActivity(users[3].id, 'Checked Out.');
        //
        $$$users.postUserActivity(users[0].id, 'Signed In.');
        $$$users.postUserEvent(users[3].id, users[0].id,
            'Fixed a broken radio.', 4.3,
            'INT:300, WIS:100', 'Hacking:300, Soldering:500');
        $$$users.postUserEvent(users[4].id, users[0].id,
            'Welcome ' + users[4].username + '! Assessment Results.', 4.8,
            'INT:3500, WIS:1750, STR:500, CHA:750, LUC:2500');
        $$$users.postUserActivity(users[0].id, 'Signed Out.');
        $$$users.postUserActivity(users[0].id, 'Checked Out.');
        //
        $$$users.postUserActivity(users[3].id, 'Checked In.');
        $$$users.postUserActivity(users[4].id, 'Checked In.');
        $$$users.postUserActivity(users[4].id, 'Checked Out.');
        //
        $$$users.postUserActivity(users[3].id, 'Signed In.');
        $$$users.postUserEvent(users[4].id, users[3].id,
            'Upgraded the work benches.', 1.8,
            'STR:400', 'Milling:700, Welding:300');
        $$$users.postUserEvent(users[1].id, users[3].id,
            'Installed new 3D printer.', 4.8,
            'INT:300, LUC:400', 'Printing:600, Hacking:100');
        $$$users.postUserActivity(users[3].id, 'Signed Out.');
        $$$users.postUserActivity(users[3].id, 'Checked Out.');
        //
        $$$users.postUserActivity(users[0].id, 'Signed In.');
        //
        return users[0];
    };


    /*
    /* */


    return factory;


}]);
