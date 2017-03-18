import angular from 'angular';

import appModule from './app.module';
import modulesComponent from './modules/modules.component';
import timelineComponent from './timeline/timeline.component';
import usersComponent from './users/users.component';
import backendService from './services/backendService';

routing.$inject = ['$stateProvider', '$urlRouterProvider'];

function routing($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/timeline');

    $stateProvider
        .state('modules', {
            url: '/modules',
            component: modulesComponent
        })
        .state('timeline', {
            url: '/timeline',
            component: timelineComponent,
            resolve: {
                timeline: timelineResolver
            }
        })
        .state('users', {
            url: '/users',
            component: usersComponent
        });
}

timelineResolver.$inject = [backendService]

function timelineResolver(backendService) {
    return backendService.getTimeline();
}

angular.module(appModule)
    .config(routing)