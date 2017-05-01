import angular from 'angular'
import modulesModule from './modules.module'

import addAndUpdateModuleController from '../modals/modules/addAndUpdateModuleModalCtrl'
import template from './module-list-item-menu.component.html'
import updateModuleTemplate from '../modals/modules/updateModuleModal.html'

class ModulesListItemMenuController {
  static get $inject() {
    return ['$mdDialog']
  }

  constructor($mdDialog) {
    this.$mdDialog = $mdDialog
  }

  deleteModule() {
    this.onDelete({ module: this.module })
  }

  updateModule(ev) {
    this.$mdDialog.show({
      locals: { selectedModule: this.module },
      controller: addAndUpdateModuleController,
      controllerAs: '$ctrl',
      template: updateModuleTemplate,
      targetEvent: ev,
      clickOutsideToClose: true
    }).then(module => {
      Object.assign(this.module, module)
      this.onChanged()
    })
  }
}

const componentName = 'hyfModuleListItemMenu'

angular.module(modulesModule)
  .component(componentName, {
    template,
    controller: ModulesListItemMenuController,
    bindings: {
      module: '<',
      onChanged: '&',
      onDelete: '&'
    }
  })

export default componentName
