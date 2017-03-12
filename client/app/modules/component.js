(function() {
    'use strict';

    class ModulesController {

        static get $inject() {
            return ['backendService', '$state', '$mdDialog', 'toastService'];
        }

        constructor(backendService, $state, $mdDialog, toastService) {
            backendService.getModules()
                .then(data => {
                    this.modules = data;
                })
                .catch(err => {
                    this.$mdDialog.show(
                        this.$mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Access Denied!')
                        .textContent('Sorry this is private page!')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('close')
                    );
                    return $state.go('timeline')
                })

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
                    controller: 'addAndUpdateModuleModalCtrl',
                    controllerAs: '$ctrl',
                    templateUrl: 'client/app/modals/modules/addModuleModal.html',
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(res => {
                    this.backendService.addModule(res)
                        .then(() => {
                            let firstLessIndex = this.modules.findIndex(val => val.seq_number > res.seq_number);
                            this.modules.splice(firstLessIndex, 0, res);
                            this.toastService.displayToast(true, `${res.module_name} has been added`);
                        })
                })
                .catch(err => console.log(err))
        };

        updateModule(ev, module) {
            this.$mdDialog.show({
                locals: {
                    selectedModule: module
                },
                controller: 'addAndUpdateModuleModalCtrl',
                controllerAs: '$ctrl',
                templateUrl: 'client/app/modals/modules/updateModuleModal.html',
                targetEvent: ev,
                clickOutsideToClose: true
            })
        }

    }

    angular.module('hyferApp')
        .component('hyfModules', {
            templateUrl: 'client/app/modules/view.html',
            controller: ModulesController
        });
})();