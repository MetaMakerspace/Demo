/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app.service.attributes', [
    'app.model.attributes'
])

/*
/* */
.factory('$$attributes', ['$q', '$http', '$window', '$$$attributes',
                    function($q, $http, $window, $$$attributes) {
    /*
    /* */


    var factory = {};
    factory.delay = 0;


    /*
    /* */


    /// then(attributes)
    /// catch(message)
    factory.getAttributes = function() {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var attrs = $$$attributes.getAttributes();
            return resolve(attrs);
        }, factory.delay); });
    };

    /// then(attributes)
    /// catch(message)
    factory.postAttributes = function(title, abbreviation) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var attrs = $$$attributes.postAttributes(title, abbreviation);
            if(!attrs) return reject('server error');
            return resolve(attrs);
        }, factory.delay); });
    };

    /// then(attributes)
    /// catch(message)
    factory.deleteAttributes = function(attrId) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var attr = $$$attributes.getAttribute(attrId);
            if(!attr) return reject('invalid attribute');
            var attrs = $$$attributes.deleteAttributes(attr);
            if(!attrs) return reject('server error');
            return resolve(attrs);
        }, factory.delay); });
    };


    /*
    /* */


    /// then(attribute)
    /// catch(message)
    factory.getAttribute = function(attrId) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var attr = $$$attributes.getAttribute(attrId);
            if(!attr) return reject('invalid attribute');
            return resolve(attr);
        }, factory.delay); });
    };

    /// then(attribute)
    /// catch(message)
    factory.putAttribute = function(attr) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var attr = $$$attributes.putAttribute(attribute);
            if(!attr) return reject('invalid attribute');
            return resolve(attr);
        }, factory.delay); });
    };

    /// then(attribute)
    /// catch(message)
    factory.deleteAttribute = function(attrId) {
        return $q(function(resolve, reject) {
        setTimeout(function() {
            var attr = $$$attributes.getAttribute(attrId);
            if(!attr) return reject('invalid attribute');
            attr = $$$attributes.deleteAttribute(attribute);
            if(!attr) return reject('server error');
            return resolve(attr);
        }, factory.delay); });
    };


    /*
    /* */


    return factory;


}]);
