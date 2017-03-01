/* Copyright (C) 2017 MetaMakerSpace */

/*
/* */
angular.module('app.router.admin', [
    'app.router.admin.logs',
    'app.router.admin.signup',
    'app.service.attributes',
    'app.service.metas',
    'app.service.skills'
])

/*
/* */
.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('admin', {
            url:'/system/',
            data: { private:true, privileged:true },
            templateUrl: '/views/admin.html',
            controller: ['$scope', '$window', '$state', '$stateParams',
                        '$$attributes', '$$metas', '$$skills',
                        function($scope, $window, $state, $stateParams,
                        $$attributes, $$metas, $$skills) {
                // manage attributes
                $scope.attr = {};
                $scope.attrs = [];
                $scope.attrsStatus = 'loading';
                $$attributes.getAttributes(
                ).then(function(attrs) {
                    $scope.attrsStatus = '';
                    $scope.attrs = attrs;
                }).catch(function(message) {
                    $scope.attrsStatus = message;
                });
                $scope.addAttribute = function() {
                    $scope.attrsStatus = 'adding';
                    $$attributes.postAttributes(
                        $scope.attr.title, $scope.attr.abbreviation
                    ).then(function(attrs) {
                        $scope.attrsStatus = '';
                        $scope.attrs = attrs;
                        $scope.attr = {};
                    }).catch(function(message) {
                        $scope.attrsStatus = message;
                    });
                };
                $scope.deleteAttribute = function(attrId) {
                    $scope.attrsStatus = 'deleting';
                    $$attributes.deleteAttributes(
                        attrId
                    ).then(function(attrs) {
                        $scope.attrsStatus = '';
                        $scope.attrs = attrs;
                    }).catch(function(message) {
                        $scope.attrsStatus = message;
                    })
                };
                // manage skills
                $scope.skill = {};
                $scope.skills = [];
                $scope.skillsStatus = 'loading';
                $$skills.getSkills(
                ).then(function(skills) {
                    $scope.skillsStatus = '';
                    $scope.skills = skills;
                }).catch(function(message) {
                    $scope.skillsStatus = message;
                });
                $scope.addSkill = function() {
                    $scope.skillsStatus = 'adding';
                    $$skills.postSkills(
                        $scope.skill.title
                    ).then(function(skills) {
                        $scope.skillsStatus = '';
                        $scope.skills = skills;
                        $scope.skill = {};
                    }).catch(function(message) {
                        $scope.skillsStatus = message;
                    });
                };
                $scope.deleteSkill = function(skillId) {
                    $scope.skillsStatus = 'deleting';
                    $$skills.deleteSkills(
                        skillId
                    ).then(function(skills) {
                        $scope.skillsStatus = '';
                        $scope.skills = skills;
                    }).catch(function(message) {
                        $scope.skillsStatus = message;
                    })
                };
                // manage restore
                $scope.restoreStatus = '';
                $scope.restoreBlankDemo = function() {
                    $scope.restoreStatus = 'restoring';
                    $$metas.restoreBlankDemo(
                    ).then(function(user) {
                        $scope.restoreStatus = '';
                        $scope.putXAccessUser(user);
                        $state.reload();
                    }).catch(function(message) {
                        $scope.restoreStatus = message;
                    });
                };
                $scope.restoreExampleDemo = function() {
                    $scope.restoreStatus = 'restoring';
                    $$metas.restoreExampleDemo(
                    ).then(function(user) {
                        $scope.restoreStatus = '';
                        $scope.putXAccessUser(user);
                        $state.reload();
                    }).catch(function(message) {
                        $scope.restoreStatus = message;
                    });
                };
            }]
        });
}]);
