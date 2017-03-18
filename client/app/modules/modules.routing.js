import angular from 'angular';

import modulesModule from './modules.module';
import modulesComponent from './modules.component';

routing.$inject = ['$stateProvider'];

function routing($stateProvider) {

    $stateProvider
        .state('modules', {
            url: '/modules',
            component: modulesComponent
        });
}

angular.module(modulesModule)
    .config(routing)