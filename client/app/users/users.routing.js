import angular from 'angular'

import usersModule from './users.module'
import usersComponent from './users.component'
import backendService from '../services/backendService'
import profileComponent from './profile.component'

routing.$inject = ['$stateProvider']

function routing($stateProvider) {
  $stateProvider
    .state('users', {
      url: '/users',
      component: usersComponent,
      resolve: {
        users: allUserProfilesResolver
      }
    })
    .state('profile', {
      url: '/profile',
      component: profileComponent,
      params: {
        id: null,
        position: null
      },
      resolve: {
        user: userProfileResolver,
        groups: groupsResolver
      }
    })
}

allUserProfilesResolver.$inject = [backendService]
function allUserProfilesResolver(backendService) {
  return backendService.getUsers()
}

userProfileResolver.$inject = ['$stateParams', backendService]
function userProfileResolver($stateParams, backendService) {
  return backendService.getUserProfile($stateParams.id)
}

groupsResolver.$inject = [backendService]
function groupsResolver(backendService) {
  return backendService.getGroups()
}

angular.module(usersModule)
  .config(routing)
