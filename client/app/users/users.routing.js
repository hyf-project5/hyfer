import angular from 'angular';

import usersModule from './users.module';
import usersComponent from './users.component';
import backendService from '../services/backendService';
import profileComponent from './profile.component';

routing.$inject = ['$stateProvider'];

function routing($stateProvider) {

    $stateProvider
        .state('users', {
            url: '/users',
            component: usersComponent,
            resolve: {
                users: usersResolver
            }
        })
        .state('profile',{
            url: '/profile/:id',
            component: profileComponent,
            resolve:{
                user: userResolver
            }
        });
}
usersResolver.$inject = [backendService];

function usersResolver(backendService) {
    return backendService.getUsers();
}

userResolver.$inject = ['$stateParams',backendService];
function userResolver($stateParams,backendService){
    return backendService.getUserById($stateParams.id);
}
angular.module(usersModule)
    .config(routing);