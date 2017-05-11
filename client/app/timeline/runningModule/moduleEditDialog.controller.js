import angular from 'angular'

import timelineModule from '../timeline.module'
import backendService from '../../services/backendService'
import timelineService from '../../timeline/timeline.service'

class ModuleEditDialogController {
  static get $inject() {
    return ['$mdDialog', timelineService, backendService, 'module']
  }

  constructor($mdDialog, timelineService, backendService, module) {
    this.$mdDialog = $mdDialog
    this.timelineService = timelineService
    this.backendService = backendService
    this.module = module
    backendService.getModules()
      .then(modules => {
        this.modules = modules
        this.selectedModule = modules[0]
      })
  }

  closeDialog() {
    this.$mdDialog.hide()
  }

  addModule() {
    const groupId = this.module.id
    this.$mdDialog.hide()
      .then(() => this.backendService.addRunningModule(this.selectedModule.id, groupId, this.module.position + 1))
      .then(() => this.timelineService.notifyChanged())
      .catch(err => {
        if (err) console.log(err)
      })
  }

  deleteModule() {
    const confirm = this.$mdDialog.confirm()
      .title(`Delete ${this.module.module_name}`)
      .textContent('Are you sure you wish to delete this module?')
      .ariaLabel('Delete module')
      .ok('Delete')
      .cancel('Cancel')
    this.$mdDialog.hide()
      .then(() => this.$mdDialog.show(confirm))
      .then(() => this.backendService.deleteRunningModule(this.module.id, this.module.position))
      .then(() => this.timelineService.notifyChanged())
      .catch(err => {
        if (err) console.log(err)
      })
  }

  splitModule() {
    this.$mdDialog.hide()
      .then(() => this.backendService.splitRunningModule(this.module.id, this.module.position))
      .then(() => this.timelineService.notifyChanged())
      .catch(err => {
        if (err) console.log(err)
      })
  }
}

const controllerName = 'ModuleEditDialogController'

angular.module(timelineModule)
  .controller(controllerName, ModuleEditDialogController)

export default controllerName
