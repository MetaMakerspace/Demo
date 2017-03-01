/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app.model.attributes', [
    'app.model.locals'
])

/*
/* */
.factory('$$$attributes', ['$q', '$http', '$window', '$$$locals',
                    function($q, $http, $window, $$$locals) {
    /*
    /* */


    var foobar = {};


    /*
    /* */


    var factory = {};


    /*
    /* */


    /// return attributes
    factory.getAttributes = function() {
        return $$$locals.getAttributes();
    };

    /// return attributes
    factory.putAttributes = function(attributes) {
        return $$$locals.putAttributes(attributes);
    };

    /// return attributes
    factory.postAttributes = function(title, abbreviation) {
        factory.postAttribute(title, abbreviation);
        return $$$locals.getAttributes();
    };

    /// return attributes
    factory.deleteAttributes = function(attribute) {
        if(!attribute) return $$$locals.putAttributes([]);
        factory.deleteAttribute(attribute);
        return $$$locals.getAttributes();
    };


    /*
    /* */


    /// return attribute
    factory.getAttribute = function(attributeId) {
        var attributes = $$$locals.getAttributes();
        for(var i=0; i<attributes.length; i++) {
            if(attributes[i].id == attributeId) {
                return attributes[i];
            }
        }
        return null;
    };

    /// return attribute
    factory.putAttribute = function(attribute) {
        var attributes = $$$locals.getAttributes();
        for(var i=0; i<attributes.length; i++) {
            if(attributes[i].id == attribute.id) {
                attributes[i] = attribute;
                attributes = $$$locals.putAttributes(attributes);
                return attributes[i];
            }
        }
        return null;
    };

    /// return attribute
    factory.postAttribute = function(title, abbreviation) {
        var attributeId = $$$locals.getNextAttributeId();
        var attributes = $$$locals.getAttributes();
        attributes.push({
            id:attributeId, title:title,
            abbreviation:abbreviation.toUpperCase(),
            description:title + ' description',
            created:new Date(), updated:new Date()
        });
        attributes = $$$locals.putAttributes(attributes);
        return attributes[attributes.length-1];
    };

    /// return attribute
    factory.deleteAttribute = function(attribute) {
        var attributes = $$$locals.getAttributes();
        for(var i=0; i<attributes.length; i++) {
            if(attributes[i].id == attribute.id) {
                attributes.splice(i, 1);
                $$$locals.putAttributes(attributes);
                return attribute;
            }
        }
        return null;
    };


    /*
    /* */


    return factory;


}]);
