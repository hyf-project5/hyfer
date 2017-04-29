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
            url: '/profile',
            component: profileComponent,
            params:{
                id: null,
                position: null
            },
            resolve:{
                user: userResolver
            }
        });
}
usersResolver.$inject = [backendService];

function usersResolver(backendService) {
    return backendService.getUsers();
}

userResolver.$inject = ['$state', '$stateParams', backendService];
function userResolver($state, $stateParams, backendService){
    let profileId = $stateParams.id;
    if(profileId){
        localStorage.setItem('profileId', profileId);
    }else{
        profileId = localStorage.getItem('profileId');
    }
    return backendService.getUserById(profileId);
}
angular.module(usersModule)
    .config(routing);