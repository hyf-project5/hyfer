(function() {
    'use strict';

    class addRunningModuleCtrl {

        static get $inject() {
            return ['$mdDialog', 'backendService', 'className'];
        }

        constructor($mdDialog, backendService, className) {
            this.$mdDialog = $mdDialog;
            this.backendService = backendService;
            backendService.getTimeline()
                .then(data => {
                    this.timeline = data;
                    this.classNames = Object.keys(this.timeline).sort();
                    this.runningModules = this.timeline[className];
                    console.log(this.runningModules)
                })
                .catch(err => console.log(err));
            this.users = [];

            backendService.getUsersProfile()
                .then(res => {
                    res.forEach(user => user.role == 'teacher' ? this.users.push(user) : null)
                })
                .catch(err => {})
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
                    this.$mdDialog.hide(submit)
                        .then(res => {
                            this.getModuleId(submit.module_name)
                                .then(id => {
                                    this.getModulePosition(submit.afterModule)
                                        .then(position => {
                                            position++
                                            console.log(position)
                                            this.backendService.addRunningModule(id, module.id, position)
                                                .then(res => console.log(res))
                                                .catch(err => console.log(err))
                                        })
                                })
                        })
                }
            })
        }

        getModuleId(module_name) {
            return new Promise(resolve => {
                this.backendService.getModules()
                    .then(modules => {
                        modules.forEach(val => {
                            if (val.module_name === module_name) {
                                resolve(val.id)
                            }
                        })
                    })
            })
        }

        getModulePosition(afterModule) {
            return new Promise(resolve => {
                this.runningModules.forEach((module, position) => {
                    if (module.module_name === afterModule) {
                        resolve(position);
                    }
                })
            })
        }

    }

    angular.module('hyferApp')
        .controller('addRunningModuleCtrl', addRunningModuleCtrl);
})();