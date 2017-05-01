import angular from 'angular'

import timelineModule from '../timeline.module'
import backendService from '../../services/backendService'

class ModuleTeachersDialogController {
  static get $inject() {
    return ['$mdDialog', backendService, 'module']
  }

  constructor($mdDialog, backendService, module) {
    this.$mdDialog = $mdDialog
    this.backendService = backendService
    this.module = module
    backendService.getUsers()
      .then(users => {
        this.teachers = users.filter(user => user.role === 'teacher')
      })
  }

  closeDialog() {
    this.$mdDialog.hide()
  }

  save() {
    this.$mdDialog.hide()
  }
}

const controllerName = 'ModuleTeachersDialogController'

angular.module(timelineModule)
  .controller(controllerName, ModuleTeachersDialogController)

export default controllerName
