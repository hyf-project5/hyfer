import angular from 'angular';

import backendService from '../../services/backendService';
import toastService from '../../services/toastService';

class AddAndUpdateRunningModuleModalController {

    static get $inject() {
        return ['$mdDialog', backendService, 'className', 'selectedRunningModule', '$state', toastService];
    }

    constructor($mdDialog, backendService, className, selectedRunningModule, $state, toastService) {
        this.$mdDialog = $mdDialog;
        this.backendService = backendService;
        this.selectedRunningModule = selectedRunningModule;
        this.$state = $state;
        this.toastService = toastService;
        this.backendService.getTimeline()
            .then(data => {
                this.timeline = data;
                this.classNames = Object.keys(this.timeline);
                this.runningModules = this.timeline[className];
            })
            .catch(err => console.log(err));
        this.users = [];

        backendService.getUsersProfile()
            .then(res => {
                res.forEach(user => user.role == 'teacher' ? this.users.push(user) : null)
            })
        this.modules = [];
        backendService.getModules()
            .then(module => this.modules.push(module))
    }

    hide() {
        this.$mdDialog.hide()
    }
    cancel() {
        this.$mdDialog.cancel()
        this.toastService.displayToast(false);
    }

    add(submit) {
        this.modules[0].forEach(module => {
            if (module.id === submit.id) {
                let groupId = this.getGroupId();
                this.$mdDialog.hide(submit)
                    .then(() => {
                        let position = submit.afterModuleIndex || -1;
                        position = position >= this.runningModules.length - 1 ? -1 : position + 1;
                        // Plus 1 because to add after the module the user specified it
                        return this.backendService.addRunningModule(module.id, groupId, position)
                            .then(res => {
                                this.$state.reload();
                                setTimeout(() => {
                                    this.toastService.displayToast(true, module.module_name + ' has been added.')
                                }, 10)
                            })
                    })
                    .catch(err => console.log(err))
            }
        })
    }

    updateRunningModule(submit) {
        this.runningModules.forEach(module => {
            if (module.running_module_id === this.selectedRunningModule.running_module_id) {
                let groupId = module.id;
                this.$mdDialog.hide(submit)
                    .then(() => {
                        let newPosition = submit.afterModuleIndex || module.position;
                        newPosition = newPosition >= this.runningModules.length - 1 ? -1 : newPosition;
                        let oldPosition = module.position;
                        submit.position = newPosition;
                        submit.teacher2_id = submit.teacher2;
                        return this.backendService.updateRunningModule(groupId, oldPosition, submit)
                            .then(res => {
                                this.$state.reload();
                                setTimeout(() => {
                                    this.toastService.displayToast(true, module.module_name + ' has been updated.')
                                }, 10)
                            })
                    })
                    .catch(err => console.log(err))
            }
        })
    }

    deleteRunningModule() {
        this.runningModules.forEach(module => {
            if (module.running_module_id === this.selectedRunningModule.running_module_id) {
                let groupId = module.id;
                this.$mdDialog.hide()
                    .then(() => {
                        let position = module.position;
                        this.backendService.deleteRunningModule(groupId, position)
                            .then(res => {
                                this.$state.reload()
                                setTimeout(() => {
                                    this.toastService.displayToast(true, module.module_name + ' has been deleted.')
                                }, 10)
                            })
                    })
                    .catch(err => console.log(err))
            }
        })
    }


    getGroupId() {
        return this.runningModules[0].id;
    }

    getModulePosition(id) {
        return this.runningModules.findIndex(runningModule => runningModule.id === id);
    }

}

const controllerName = 'addAndUpdateRunningModuleModalCtrl';

angular.module('hyferApp')
    .controller(controllerName, AddAndUpdateRunningModuleModalController);

export default controllerName;