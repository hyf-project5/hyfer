import angular from 'angular';

import './app.module';
import './toolbar/toolbar.component';
import modulesComponent from './modules/modules.component';
import timelineComponent from './timeline/timeline.component';
import usersComponent from './users/users.component';
import backendService from './services/backendService';

const defaultMe = {
    username: 'visitor',
    role: 'visitor'
}

angular.module('hyferApp')
    .config(mainConfig)
    .value('me', defaultMe)
    .run(run)

mainConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function mainConfig($stateProvider, $urlRouterProvider) {

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

run.$inject = ['$cookies', backendService, 'me'];

function run($cookies, backendService, me) {

    let token = $cookies.get('token')
    if (token) {
        let jwt = token.slice(1, -1);
        window.localStorage.setItem('token', jwt);
    }

    if (window.localStorage.getItem('token')) {
        backendService.getMyProfile()
            .then(profile => {
                me.username = profile.username;
                me.role = profile.role;
            })
            .catch(err => {
                window.localStorage.removeItem(token);
                console.warn(`getMyProfile error: ${err.message}`);
            })
    }
}