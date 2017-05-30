import angular from 'angular'

import timelineModule from '../timeline.module'
import timelineService from '../timeline.service'
import template from './runningModule.component.html'
import backendService from '../../services/backendService'
import ModuleEditDialogController from './moduleEditDialog.controller'
import moduleEditDialogTemplate from './moduleEditDialog.template.html'
import ModuleTeachersDialogController from './moduleTeachersDialog.controller'
import moduleTeachersDialogTemplate from './moduleTeachersDialog.template.html'
import './runningModule.scss'

class RunningModuleController {
  static get $inject() {
    return ['$state', '$mdDialog', 'me', timelineService, backendService]
  }

  get style() {
    return {
      left: this.module.leftPosition + 'px',
      width: this.module.blockWidth + 'px',
      background: this.module.color
    }
  }

  constructor($state, $mdDialog, me, timelineService, backendService) {
    this.$state = $state
    this.$mdDialog = $mdDialog
    this.me = me
    this.timelineService = timelineService
    this.backendService = backendService
  }

  editModule(ev) {
    this.$mdDialog.show({
      locals: { module: this.module },
      controller: ModuleEditDialogController,
      controllerAs: '$ctrl',
      template: moduleEditDialogTemplate,
      targetEvent: ev,
      clickOutsideToClose: true
    })
  }

  editTeachers(ev) {
    this.$mdDialog.show({
      locals: { module: this.module },
      controller: ModuleTeachersDialogController,
      controllerAs: '$ctrl',
      template: moduleTeachersDialogTemplate,
      targetEvent: ev,
      clickOutsideToClose: true
    })
  }

  isTeacher() {
    return this.me.role === 'teacher'
  }

  moveLeft() {
    const position = this.module.position - 1
    this.backendService.updateRunningModule(this.module.id, this.module.position, { position })
      .then(() => {
        this.timelineService.notifyTimelineChanged()
      })
      .catch(err => console.log(err))
  }

  moveRight() {
    const position = this.module.position + 1
    this.backendService.updateRunningModule(this.module.id, this.module.position, { position })
      .then(() => {
        this.timelineService.notifyTimelineChanged()
      })
      .catch(err => console.log(err))
  }

  weekShorter() {
    const duration = this.module.duration - 1
    this.backendService.updateRunningModule(this.module.id, this.module.position, { duration })
      .then(() => {
        this.timelineService.notifyTimelineChanged()
      })
      .catch(err => console.log(err))
  }

  weekLonger() {
    const duration = this.module.duration + 1
    this.backendService.updateRunningModule(this.module.id, this.module.position, { duration })
      .then(() => {
        this.timelineService.notifyTimelineChanged()
      })
      .catch(err => console.log(err))
  }
}

const componentName = 'hyfRunningModule'

angular.module(timelineModule)
  .component(componentName, {
    template,
    bindings: {
      module: '<',
      selectedModule: '<',
      modules: '<'
    },
    controller: RunningModuleController
  })

export default componentName
