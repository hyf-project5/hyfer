import angular from 'angular';
import modulesModule from './modules.module';

import '../footer/footer.component';
import backendService from '../services/backendService';
import toastService from '../services/toastService';
import addAndUpdateModuleController from '../modals/modules/addAndUpdateModuleModalCtrl';
import template from './modules.component.html';
import addModuleTemplate from '../modals/modules/addModuleModal.html';
import updateModuleTemplate from '../modals/modules/updateModuleModal.html';

class ModulesController {

    static get $inject() {
        return ['$state', '$mdDialog', backendService, toastService];
    }

    constructor($state, $mdDialog, backendService, toastService) {
        this.backendService = backendService;
        this.$mdDialog = $mdDialog;
        this.toastService = toastService;
        this.$state = $state;
    }

    addModule(ev) {
        this.$mdDialog.show({
                locals: {
                    selectedModule: null
                },
                controller: addAndUpdateModuleController,
                controllerAs: '$ctrl',
                template: addModuleTemplate,
                targetEvent: ev,
                clickOutsideToClose: true
            })
            .then(res => {
                this.backendService.addModule(res)
                    .then(() => {
                        let firstLessIndex = this.modules.findIndex(val => val.seq_number > res.seq_number);
                        this.modules.splice(firstLessIndex, 0, res);
                        this.toastService.displayToast(true, `${res.module_name} has been added`);
                    });
            })
            .catch(err => console.log(err));
    }

    updateModule(ev, module) {
        this.$mdDialog.show({
            locals: {
                selectedModule: module
            },
            controller: addAndUpdateModuleController,
            controllerAs: '$ctrl',
            template: updateModuleTemplate,
            targetEvent: ev,
            clickOutsideToClose: true
        });
    }

}

const componentName = 'hyfModules';

angular.module(modulesModule)
    .component(componentName, {
        template,
        controller: ModulesController,
        bindings: {
            modules: '<'
        }
    });

export default componentName;