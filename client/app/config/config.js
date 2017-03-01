(function() {
    'use strict';

    angular
        .module('hyferApp')
        .config(mainConfig)
        /** @ngInject */
    mainConfig.inject = ['$stateProvider', '$urlRouterProvider'];

    function mainConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/')
        $stateProvider
            .state('home', {
                url: '/',
                component: 'homeLogin'
            })
            .state('modules', {
                url: '/modules',
                component: 'modules'
            })

    }


}());