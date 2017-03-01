/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app.service.users', [
    'app.model.users'
])

/*
/* */
.factory('$$users', ['$q', '$http', '$window', '$$$users',
                    function($q, $http, $window, $$$users) {
    /*
    /* */


    var factory = {};
    factory.delay = 0;


    /*
    /* */


    /// then(users)
    /// catch(message)
    factory.getUsers = function() {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var users = $$$users.getUsers();
            $$$users.populateUsers(users);
            return resolve(users);
        }, factory.delay); });
    };

    /// then(user)
    /// catch(message)
    factory.getUser = function(userId) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var user = $$$users.getUser(userId);
            if(!user) return reject('invalid user');
            $$$users.populateUser(user);
            return resolve(user);
        }, factory.delay); });
    };

    /// then(user)
    /// catch(message)
    factory.deleteUser = function(userId) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var user = $$$users.deleteUser(userId);
            if(!user) return reject('server error');
            $$$users.populateUser(user);
            return resolve(user);
        }, factory.delay); });
    };


    /*
    /* */


    /// then(user)
    /// catch(message)
    factory.putUserAvatar = function(userId, avatar) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var user = $$$users.getUser(userId);
            if(!user) return reject('invalid user');
            user = $$$users.putUserAvatar(userId, avatar);
            if(!user) return reject('server error');
            $$$users.populateUser(user);
            return resolve(user);
        }, factory.delay); });
    };

    /// then(user)
    /// catch(message)
    factory.putUserBiography = function(userId, biography) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var user = $$$users.getUser(userId);
            if(!user) return reject('invalid user');
            user = $$$users.putUserBiography(userId, biography);
            if(!user) return reject('server error');
            $$$users.populateUser(user);
            return resolve(user);
        }, factory.delay); });
    };

    /// then(user)
    /// catch(message)
    factory.putUserEmail = function(userId, oldEmail, newEmail, password) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            if(!oldEmail) return reject('old email required');
            if(!newEmail) return reject('new email required');
            if(!password) return reject('password required');
            var user = $$$users.getUser(userId);
            if(!user) return reject('invalid user');
            if(user.password != password) return reject('invalid password');
            var emailUser = $$$users.getUserByEmail(newEmail);
            if(emailUser) return reject('email must be unique');
            user = $$$users.putUserEmail(userId, newEmail);
            if(!user) return reject('server error');
            $$$users.populateUser(user);
            return resolve(user);
        }, factory.delay); });
    };

    /// then(user)
    /// catch(message)
    factory.putUserPassword = function(userId, oldPassword, newPassword1, newPassword2) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            if(!oldPassword) return reject('old password required');
            if(!newPassword1) return reject('new password required');
            if(newPassword1 != newPassword2) return reject('new passwords mismatch');
            var user = $$$users.getUser(userId);
            if(!user) return reject('invalid user');
            if(user.password != oldPassword) return reject('invalid old password');
            user = $$$users.putUserPassword(userId, newPassword1);
            if(!user) return reject('server error');
            $$$users.populateUser(user);
            return resolve(user);
        }, factory.delay); });
    };

    /// then(user)
    /// catch(message)
    factory.postUserActivity = function(userId, comment) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            if(!comment) return reject('comment required');
            var user = $$$users.getUser(usermail);
            if(!user) return reject('invalid user');
            user = $$$users.postUserActivity(user.id, comment);
            if(!user) return reject('server error');
            $$$users.populateUser(user);
            return resolve(user);
        }, factory.delay); });
    };

    /// then(user)
    /// catch(message)
    factory.postUserEvent = function(userId, byUserId, comment, reputation,
                                    attributes, skills) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            if(!comment) return reject('comment required');
            if(!reputation && reputation != 0) return reject('reputation required');
            if(reputation > 5) return reject('reputation must be less than 5');
            if(reputation < 0) return reject('reputation must be at least 0');
            var user = $$$users.getUser(userId);
            if(!user) return reject('invalid user');
            var byUser = $$$users.getUser(byUserId);
            if(!byUser) return reject('invalid by user');
            user = $$$users.postUserEvent(userId, byUserId, comment, reputation,
                                            attributes, skills);
            if(!user) return reject('server error');
            $$$users.populateUser(user);
            return resolve(user);
        }, factory.delay); });
    };


    /*
    /* */


    return factory;


}]);
