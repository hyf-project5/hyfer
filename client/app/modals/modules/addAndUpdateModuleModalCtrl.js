import angular from 'angular';

import modalsModules from '../modals.module';
import backendService from '../../services/backendService';
import toastService from '../../services/toastService';
import 'angular-bootstrap-colorpicker/css/colorpicker.css';

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
        this.currentModule = Object.assign({}, selectedModule);
        this.newModule = {};
    }
    hide() {
        this.$mdDialog.hide();
    }
    cancel() {
        this.$mdDialog.cancel();
        setTimeout(() => {
            this.toastService.displayToast(false);
        }, 10);
    }
    add() {
        this.$mdDialog.hide(this.newModule);
    }

    update() {
        this.$mdDialog.hide(this.currentModule);
        setTimeout(() => {
            this.toastService.displayToast(true, `${this.selectedModule.module_name} has been updated`);
        }, 10);
    }
}

const controllerName = 'addAndUpdateModuleModalController';

angular.module(modalsModules)
    .controller(controllerName, AddAndUpdateModuleModalController);

export default controllerName;