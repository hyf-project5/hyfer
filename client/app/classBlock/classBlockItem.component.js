(function() {
    'use strict';
    class ClassBlockItemController {

        static get $inject() {
            return ['$mdDialog', 'backendService'];
        }

        constructor($mdDialog, backendService) {
            this.bgColor = this.randomColor();
            this.$mdDialog = $mdDialog;
        }

        randomColor() {
            let themeColor = ['#5cbae6', '#b6d957', '#fac364', '#8cd3ff', '#d998cb', '#f2d249', '#93b9c6', '#ccc5a8', '#52bacc', '#dbdb46', '#98aafb'];
            let xColor = Math.floor(Math.random() * themeColor.length);
            return themeColor[xColor];
        }

        addRunningModule(ev, className) {
            this.$mdDialog.show({
                    controller: 'addRunningModuleCtrl',
                    controllerAs: '$ctrl',
                    templateUrl: 'client/app/classBlock/addRunningModuleModal.html',
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }

    }

    angular.module('hyferApp')
        .component('hyfClassBlockItem', {
            templateUrl: './app/classBlock/classBlockItem.component.html',
            controller: ClassBlockItemController,
            bindings: {
                className: '<'
            }
        });
})();