(function() {
    'use strict';

    angular
        .module('myApp')
        .config(mainConfig)

    /** @ngInject */
    mainConfig.inject = ['$stateProvider', '$urlRouterProvider'];

    function mainConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                template: `<h2> hasan sh </h2>`,
                controller: function() {
                    this.name = 'hasan';
                }
            })
            .state('user', {
                url: '/user',
                template: `<h2> user hasan SH </h2>`,
                controller: function() {
                    this.name = 'user ...';
                }
            })
    }

}());