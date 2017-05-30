import angular from 'angular'

import usersModule from './users.module'
import backendService from '../services/backendService'
import template from './profile.component.html'
import toolbarService from '../toolbar/toolbar.service'
import toastService from '../services/toastService'

class ProfileController {
  static get $inject() {
    return ['$timeout', '$state', '$stateParams', toolbarService, backendService]
  }

  constructor($timeout, $state, $stateParams, toolbarService, backendService) {
    this.toolbarService = toolbarService
    this.toolbarService.switchToChild({
      title: 'Edit Profile',
      backState: 'users',
      position: $stateParams.position
    })
    this.backendService = backendService
    this.$timeout = $timeout
    this.$state = $state
    this.model = {}
    this.isDirty = false
  }

  $onInit() {
   Object.assign(this.model, this.user)
  }

  save() {
    this.user = this.model
    this.backendService.updateUserProfile(this.user)
      .then(() =>this.$state.go('users'))
      .catch(err => console.log(err))
  }

  setDirty() {
    this.isDirty = true
  }

  reset() {
    Object.assign(this.model, this.user)
    this.isDirty = false
  }
}

const componentName = 'hyfProfile'

angular
  .module(usersModule)
  .component(componentName, {
    template,
    controller: ProfileController,
    bindings: {
      user: '<',
      groups: '<'
    }
  })

export default componentName
