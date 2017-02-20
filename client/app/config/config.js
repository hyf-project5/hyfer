(function() {
    'use strict';

    angular
        .module('myApp')
        .config(mainConfig)
        /** @ngInject */
    mainConfig.inject = ['$stateProvider', '$urlRouterProvider'];

    function mainConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/')
        $stateProvider
            .state('home', {
                url: '/',
                template: `<home-login></home-login>`
            })
            .state('modules', {
                url: '/modules',
                template: `<modules></modules>`
            })

    }


}());