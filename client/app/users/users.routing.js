import angular from 'angular';

import usersModule from './users.module';
import usersComponent from './users.component';

routing.$inject = ['$stateProvider'];

function routing($stateProvider) {

    $stateProvider
        .state('users', {
            url: '/users',
            component: usersComponent
        });
}

angular.module(usersModule)
    .config(routing)