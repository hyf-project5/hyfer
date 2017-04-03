import angular from 'angular';
import modulesModule from './modules.module';

import './module-list-item.component';

import toastService from '../services/toastService';
import template from './module-list.component.html';

class ModulesListController {

    static get $inject() {
        return ['$mdDialog', toastService];
    }

    constructor($mdDialog, toastService) {
        this.$mdDialog = $mdDialog;
        this.toastService = toastService;
    }


    deleteModule(module) {
        this.modules = this.modules.filter(m => m.id !== module.id);
        this.toastService.displayToast(true, `${module.module_name} have been deleted`);
        this.changed();
    }

    move(index) {
        this.modules.splice(index, 1);
        this.changed();
    }

    changed(module) {
        if (module) {
            const targetModule = this.modules.find(m => m.id === module.id);
            Object.assign(targetModule, module);
        }
        this.onChanged({modules: this.modules});
    }
}

const componentName = 'hyfModuleList';

angular.module(modulesModule)
    .component(componentName, {
        template,
        controller: ModulesListController,
        bindings: {
            modules: '<',
            weekWidth: '<',
            onChanged: '&'
        }
    });

export default componentName;