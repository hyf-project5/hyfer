import angular from 'angular'

import toolbarModule from './toolbar.module'
import toolbarService from './toolbar.service'
import template from './childToolbar.component.html'

class ChildToolbarController {
  static get $inject() {
    return [toolbarService]
  }

  constructor(toolbarService) {
    this.toolbarService = toolbarService
    this.show = false
    this.toolbarService.addListener(this.onNotification.bind(this))
  }

  onNotification(toolbarName) {
    if (toolbarName === 'child') {
      this.title = this.toolbarService.getTitle()
      this.show = true
    } else {
      this.show = false
    }
  }

  back() {
    this.toolbarService.switchToMain()
  }
}

const componentName = 'hyfChildToolbar'

angular
  .module(toolbarModule)
  .component(componentName, {
    template,
    controller: ChildToolbarController
  })

export default componentName
