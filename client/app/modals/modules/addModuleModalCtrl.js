(function() {
    'use strict';

    class addModuleModalCtrl {

        static get $inject() {
            return ['$mdDialog', 'toastService'];
        }

        constructor($mdDialog, toastService) {
            this.$mdDialog = $mdDialog;
            this.toastService = toastService;
        }
        hide() {
            this.$mdDialog.hide()
        }
        cancel() {
            this.$mdDialog.cancel()
            setTimeout(() => {
                this.toastService.displayToast(false)
            }, 10)
        }
        add(submit) {
            this.$mdDialog.hide(submit)
        }

    }

    angular.module('hyferApp')
        .controller('addModuleModalCtrl', addModuleModalCtrl);
})();