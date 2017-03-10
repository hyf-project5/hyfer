(function() {
    'use strict';

    class addRunningModuleCtrl {

        static get $inject() {
            return ['$mdDialog', 'backendService', 'className', 'selectedRunningModule', 'index'];
        }

        constructor($mdDialog, backendService, className, selectedRunningModule, index) {
            this.$mdDialog = $mdDialog;
            this.backendService = backendService;
            this.selectedRunningModule = selectedRunningModule;
            this.index = index;
            backendService.getTimeline()
                .then(data => {
                    this.timeline = data;
                    this.classNames = Object.keys(this.timeline);
                    this.runningModules = this.timeline[className];
                    console.log(className)
                        // console.log(this.selectedRunningModule)
                })
                .catch(err => console.log(err));
            this.users = [];

            backendService.getUsersProfile()
                .then(res => {
                    res.forEach(user => user.role == 'teacher' ? this.users.push(user) : null)
                })
        }

        hide() {
            this.$mdDialog.hide()
        }
        cancel() {
            this.$mdDialog.cancel()
        }

        add(submit) {
            this.runningModules.forEach(module => {
                if (module.module_name === submit.module_name) {
                    let groupId = module.id;
                    this.$mdDialog.hide()
                        .then(() => {
                            this.getModuleId(submit.module_name)
                                .then(moduleId => {
                                    let position = submit.index;
                                    position = position >= this.runningModules.length - 1 ? -1 : position;
                                    this.backendService.addRunningModule(moduleId, groupId, position)
                                        .then(res => {
                                            location.reload()
                                        })
                                        .catch(err => console.log(err))
                                })
                        })
                }
            })
        }

        updateRunningModule(submit) {
            this.runningModules.forEach(module => {
                if (module.module_name === this.selectedRunningModule.module_name) {
                    let groupId = module.id;
                    this.$mdDialog.hide(submit)
                        .then(() => {
                            console.log(submit)
                            console.log('this the index: ' + this.index)
                            let newPosition = submit.afterModule;
                            newPosition = newPosition >= this.runningModules.length - 1 ? -1 : newPosition;
                            let oldPosition = this.index;
                            submit.position = newPosition;
                            return this.backendService.updateRunningModule(groupId, oldPosition, submit)
                                .then(res => {
                                    console.log(res)
                                    location.reload()
                                })
                        })
                        .catch(err => console.log(err))
                }
            })
        }

        deleteRunningModule() {
            this.runningModules.forEach(module => {
                if (module.module_name === this.selectedRunningModule.module_name) {
                    let groupId = module.id;
                    this.$mdDialog.hide()
                        .then(() => {
                            let position = this.index;
                            this.backendService.deleteRunningModule(groupId, position)
                                .then(res => console.log(res))
                                .catch(err => console.log(err))
                        })
                }
            })
        }


        getModuleId(module_name) {
            return this.backendService.getModules()
                .then(modules => modules.find(mod => mod.module_name === module_name).id)
        }

        getModulePosition(id) {
            return this.runningModules.findIndex(mod => mod.id === id);
        }

    }

    angular.module('hyferApp')
        .controller('addRunningModuleCtrl', addRunningModuleCtrl);
})();