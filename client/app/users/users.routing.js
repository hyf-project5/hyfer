import angular from 'angular';

import usersModule from './users.module';
import usersComponent from './users.component';
import backendService from '../services/backendService';

routing.$inject = ['$stateProvider'];

function routing($stateProvider) {

    $stateProvider
        .state('users', {
            url: '/users',
            component: usersComponent,
            resolve: {
                users: usersResolver
            }
        });
}
usersResolver.$inject = [backendService];

function usersResolver(backendService) {
    return backendService.getUsers();
}

angular.module(usersModule)
    .config(routing);