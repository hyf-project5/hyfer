import angular from 'angular';

import backendService from '../../services/backendService';
import toastService from '../../services/toastService';


class AddAndUpdateModuleModalController {

    static get $inject() {
        return ['$mdDialog', toastService, 'selectedModule', backendService, '$state'];
    }

    constructor($mdDialog, toastService, selectedModule, backendService, $state) {
        this.$mdDialog = $mdDialog;
        this.toastService = toastService;
        this.selectedModule = selectedModule;
        this.backendService = backendService;
        this.$state = $state;
    }
    hide() {
        this.$mdDialog.hide()
    }
    cancel() {
        this.$mdDialog.cancel()
        setTimeout(() => {
            this.toastService.displayToast(false)
        }, 10)
    }
    add(submit) {
        this.$mdDialog.hide(submit)
    }

    update(submit) {
        this.$mdDialog.hide(submit)
            .then(res => {
                console.log(res)
                let correct = Object.values(res).filter(val => val !== undefined)
                if (correct.length < 1) {
                    return this.toastService.displayToast(true, 'Nothing Changed');
                }
                this.backendService.updateModule(this.selectedModule.id, res)
                    .then((res) => {
                        this.$state.reload();
                        setTimeout(() => {
                            this.toastService.displayToast(true, `${this.selectedModule.module_name} has been updated`);
                        }, 10)
                    })
            })
            .catch(err => console.log(err))
    }

    deleteModule() {
        this.$mdDialog.hide()
            .then(res => {
                this.backendService.deleteModule(this.selectedModule.id)
                    .then((res) => {
                        this.$state.reload();
                        setTimeout(() => {
                            this.toastService.displayToast(true, `${this.selectedModule.module_name} has been deleted`);
                        }, 10)
                    })
            })
            .catch(err => console.log(err))
    }
}

const controllerName = 'addAndUpdateModuleModalCtrl'

angular.module('hyferApp')
    .controller(controllerName, AddAndUpdateModuleModalController);

export default controllerName;