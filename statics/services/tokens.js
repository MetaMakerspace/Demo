/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app.service.tokens', [
    'app.model.users'
])

/*
/* */
.factory('$$tokens', ['$q', '$http', '$window', '$$$users',
                    function($q, $http, $window, $$$users) {
    /*
    /* */


    var factory = {};
    factory.delay = 0;


    /*
    /* */


    /// then(userToken)
    /// catch(message)
    factory.putUserToken = function(usermail, password) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            if(!usermail) return reject('username || email required');
            if(!password) return reject('password required');
            var user = $$$users.getUser(usermail, password);
            if(!user) return reject('invalid credentials');
            user = $$$users.postUserActivity(user.id, 'Signed In.');
            if(!user) return reject('server error');
            return resolve([user, user.id]);
        }, factory.delay); });
    };

    /// then(userToken)
    /// catch(message)
    factory.postUserToken = function(username, email, password) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            if(!email) return reject('email required');
            if(!username) return reject('username required');
            if(!password) return reject('password required');
            var user = $$$users.getUserByUsername(username);
            if(user) return reject('unique username required');
            user = $$$users.getUserByEmail(email);
            if(user) return reject('unique email required');
            user = $$$users.postUser(username, email, password);
            if(!user) return reject('server error');
            user = $$$users.postUserActivity(user.id, 'Signed Up.');
            if(!user) return reject('server error');
            return resolve([user, user.id]);
        }, factory.delay); });
    };

    /// then(user)
    /// catch(message)
    factory.postUserActivity = function(usermail, comment) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            if(!usermail) return reject('username || email required');
            if(!comment) return reject('comment required');
            var user = $$$users.getUserByUsername(usermail);
            if(!user) return reject('invalid username || email');
            user = $$$users.postUserActivity(user.id, comment);
            if(!user) return reject('server error');
            return resolve(user);
        }, factory.delay); });
    };

    /// then(resetCode)
    /// catch(message)
    factory.recoverUserToken = function(usermail) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            if(!usermail) return reject('username || email required');
            var user = $$$users.getUserByUsername(usermail);
            if(!user) return reject('invalid username || email');
            return resolve(user.id);
        }, factory.delay); });
    };

    /// then(userToken)
    /// catch(message)
    factory.resetUserToken = function(resetCode, password1, password2) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            if(!resetCode) return reject('reset code required');
            if(!password1 || !password2) return reject('passwords required');
            if(password1 != password2) return reject('passwords must match');
            var user = $$$users.getUser(resetCode);
            if(!user) return reject('invalid reset code');
            user = $$$users.putUserPassword(resetCode, password1);
            if(!user) return reject('server error');
            return resolve([user, user.id]);
        }, factory.delay); });
    };


    /*
    /* */


    return factory;


}]);
