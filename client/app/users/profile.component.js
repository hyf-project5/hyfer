import angular from 'angular'

import usersModule from './users.module'
import backendService from '../services/backendService'
import template from './profile.component.html'
import toolbarService from '../toolbar/toolbar.service'
import freecodecamp from '../../assets/images/freecodecamp.svg'
import toastService from '../services/toastService'

class ProfileController {
  static get $inject() {
    return ['$timeout', '$state', '$stateParams', toastService, toolbarService, backendService]
  }

  constructor($timeout, $state, $stateParams, toastService, toolbarService, backendService) {
    this.toolbarService = toolbarService
    this.toolbarService.switchToChild({
      title: 'Edit Profile',
      backState: 'users',
      position: $stateParams.position
    })
    this.backendService = backendService
    this.$timeout = $timeout
    this.freecodecamp = freecodecamp
    this.$state = $state
    this.toastService = toastService
  }

  getGroupsNameId() {
    return this.$timeout(() => {
      this.backendService.getTimeline()
        .then(res => {
          const classesName = Object.entries(res)
          this.classes = classesName.reduce((acc, curr) => {
            const classNameAndId = {
              name: curr[0],
              group_id: curr[1][0].id
            }
            acc.push(classNameAndId)
            return acc
          }, [])
          console.log(this.classes)
        })
    }, 400)
  }

  save(user) {
    console.log(this.user)
    for (const key in user) {
      if (user[key]) {
        this.user[key] = user[key] || this.user[key]
      }
    }
    this.backendService.updateState(this.user)
      .then(() => this.toastService.displayToast(true, 'Changes have been saved'))
  }

  cancelChanges() {
    this.$state.reload()
  }
}

const componentName = 'hyfProfile'

angular
  .module(usersModule)
  .component(componentName, {
    template,
    controller: ProfileController,
    bindings: {
      user: '<'
    }
  })

export default componentName
