import angular from 'angular'

import usersModule from './users.module'
import backendService from '../services/backendService'
import toastService from '../services/toastService'
import template from './users.component.html'
import './users.scss'
import avatar from '../../assets/images/avatar.png'
import freecodecamp from '../../assets/images/freecodecamp.svg'
import toolbarService from '../toolbar/toolbar.service'

class UsersController {
  static get $inject() {
    return ['$state', '$mdDialog', toolbarService, toastService, backendService, 'me', '$mdSidenav']
  }

  constructor($state, $mdDialog, toolbarService, toastService, backendService, me) {
    this.backendService = backendService
    this.me = me
    this.$mdDialog = $mdDialog
    this.$state = $state
    this.toastService = toastService
    this.avatar = avatar
    this.freecodecamp = freecodecamp
    this.toolbarService = toolbarService
    const content = document.getElementById('content')
    content.addEventListener('scroll', (e) => {
      this.position = e.target.scrollTop
    })
  }

  $onInit() {
    setTimeout(() => {
      document.getElementById('content').scrollTop = this.toolbarService.getPosition()
    }, 400)
    for (const val of this.users) {
      if (!val.github_username) {
        val.github_username = 'random'
      }
    }
  }

  canEdit() {
    return this.me.role === 'teacher'
  }

  goToProfile(user) {
    this.$state.go('profile', { id: user.id, position: this.position })
  }
}

const componentName = 'hyfUsers'

angular
  .module(usersModule)
  .component(componentName, {
    template,
    controller: UsersController,
    bindings: {
      users: '<'
    }
  })

export default componentName
