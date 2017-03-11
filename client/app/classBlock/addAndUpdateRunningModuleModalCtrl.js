(function() {
    'use strict';

    class addAndUpdateRunningModuleModalCtrl {

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
                    // console.log(this.runningModules)
                    // console.log(this.selectedRunningModule)
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
        }

        add(submit) {
            this.modules[0].forEach(module => {
                if (module.module_name === submit.module_name) {
                    let groupId = this.getGroupId();
                    this.$mdDialog.hide()
                        .then(() => {
                            let position = submit.afterModuleIndex || -1;
                            position = position >= this.runningModules.length - 1 ? -1 : position;
                            console.log(position)
                            return this.backendService.addRunningModule(module.id, groupId, position)
                                .then(res => {

                                    // location.reload();
                                })
                        })
                        .catch(err => console.log(err))
                }
            })
        }

        updateRunningModule(submit) {
            this.runningModules.forEach(module => {
                if (module.module_name === this.selectedRunningModule.module_name) {
                    let groupId = module.id;
                    this.$mdDialog.hide(submit)
                        .then(() => {
                            let newPosition = submit.afterModule;
                            newPosition = newPosition >= this.runningModules.length - 1 ? -1 : newPosition;
                            let oldPosition = this.index;
                            submit.position = newPosition;
                            return this.backendService.updateRunningModule(groupId, oldPosition, submit)
                                .then(res => {
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


        getGroupId() {
            return this.runningModules[0].id;
        }

        getModulePosition(id) {
            return this.runningModules.findIndex(runningModule => runningModule.id === id);
        }

    }

    angular.module('hyferApp')
        .controller('addAndUpdateRunningModuleModalCtrl', addAndUpdateRunningModuleModalCtrl);
})();