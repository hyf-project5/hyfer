(function() {
    'use strict';

    class toastService {

        static get $inject() {
            return ['$mdToast'];
        }
        constructor($mdToast) {
            this.$mdToast = $mdToast;
        }

        displayToast(add, newModule, group) {
            if (add) {
                this.$mdToast.show(
                    this.$mdToast.simple()
                    .textContent(`${newModule.module_name || group.group_name} has been added!`)
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