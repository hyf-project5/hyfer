(function() {
    'use strict';

    class dialogController {

        static get $inject() {
            return ['$mdDialog'];
        }

        constructor($mdDialog) {
            this.$mdDialog = $mdDialog;
        }
        hide() {
            this.$mdDialog.hide()
        }
        cancel() {
            this.$mdDialog.cancel()
        }
        add(submit) {
            this.$mdDialog.hide(submit)
        }

    }

    angular.module('hyferApp')
        .controller('dialogController', dialogController);
})();