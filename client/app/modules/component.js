(function() {
    'use strict';

    class ModulesController {

        static get $inject() {
            return ['backendService', 'me', '$state', '$mdDialog', 'toastService'];
        }

        constructor(backendService, me, $state, $mdDialog, toastService) {
            if (me.role !== 'teacher') {
                alert('access denied!!')
                return $state.go('timeline')
            }
            backendService.getModules()
                .then(data => {
                    this.modules = data;
                })

            this.backendService = backendService;
            this.$mdDialog = $mdDialog;
            this.toastService = toastService;

        }

        addModuleModal(ev) {
            this.$mdDialog.show({
                    controller: 'dialogController',
                    controllerAs: '$ctrl',
                    templateUrl: 'client/app/modules/addModuleModal.html',
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