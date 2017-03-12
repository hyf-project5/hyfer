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

        }

        addModuleModal(ev) {
            this.$mdDialog.show({
                    controller: 'addModuleModalCtrl',
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
                            this.toastService.displayToast(true, res);
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => this.toastService.displayToast(false));
        };

    }

    angular.module('hyferApp')
        .component('hyfModules', {
            templateUrl: 'client/app/modules/view.html',
            controller: ModulesController
        });
})();