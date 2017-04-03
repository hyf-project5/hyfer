import angular from 'angular';

import appModule from './app.module';
import './timeline/timeline.routing';
import './modules/modules.routing';
import './users/users.routing';

config.$inject = ['$urlRouterProvider', '$locationProvider'];

function config($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/timeline');

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}

angular.module(appModule)
    .config(config);