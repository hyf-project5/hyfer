(function() {
    'use strict';

    angular
        .module('hyferApp')
        .config(mainConfig)
        .run(run)

    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

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

    run.$inject = ['$cookies'];

    function run($cookies) {
        let token = $cookies.get('token')
        if (token) {
            let jwt = token.slice(1, -1);
            window.localStorage.setItem('token', jwt);
        }
    }

}());