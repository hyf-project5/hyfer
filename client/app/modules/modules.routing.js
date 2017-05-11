import angular from 'angular'

import modulesModule from './modules.module'
import modulesComponent from './modules.component'
import backendService from '../services/backendService'

routing.$inject = ['$stateProvider']

function routing($stateProvider) {
  $stateProvider
    .state('modules', {
      url: '/modules',
      component: modulesComponent,
      resolve: {
        modules: modulesResolver
      }
    })
}

modulesResolver.$inject = [backendService]

function modulesResolver(backendService) {
  return backendService.getModules()
}

angular.module(modulesModule)
  .config(routing)
