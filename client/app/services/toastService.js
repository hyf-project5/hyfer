(function() {
    'use strict';

    class toastService {

        static get $inject() {
            return ['$mdToast'];
        }
        constructor($mdToast) {
            this.$mdToast = $mdToast;
        }

        displayToast(add, action) {
            if (add) {
                this.$mdToast.show(
                    this.$mdToast.simple()
                    .textContent(action)
                    .position('right')
                    .hideDelay(3000)
                    .action('Close')
                    .highlightAction(true)
                    .highlightClass('md-primary')
                );
                return;
            }
            this.$mdToast.show(
                this.$mdToast.simple()
                .textContent(`Nothing changed!`)
                .position('right')
                .hideDelay(3000)
                .action('Close')
                .highlightAction(true)
                .highlightClass('md-warn')
            );
        }
    }

    angular.module('hyferApp')
        .service('toastService', toastService);
}());