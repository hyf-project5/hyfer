import angular from 'angular'

import modalsModules from '../modals.module'
import toastService from '../../services/toastService'

class AddClassModalController {
  static get $inject() {
    return ['$mdDialog', toastService, '$state']
  }

  constructor($mdDialog, toastService, $state) {
    this.$mdDialog = $mdDialog
    this.toastService = toastService
    this.$state = $state
  }

  cancel() {
    this.$mdDialog.cancel()
    // setTimeout(() => {
    //     this.toastService.displayToast(false);
    // }, 10);
  }

  add(group) {
    this.$mdDialog.hide(group)
  }
}

const controllerName = 'AddClassModalController'

angular.module(modalsModules)
  .controller(controllerName, AddClassModalController)

export default controllerName
