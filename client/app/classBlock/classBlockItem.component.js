(function() {
    'use strict';
    class ClassBlockItemController {

        static get $inject() {
            return ['$mdDialog', 'backendService', 'me'];
        }

        constructor($mdDialog, backendService, me) {
            this.bgColor = this.randomColor();
            this.$mdDialog = $mdDialog;
            this.me = me;
        }

        isTeacher() {
            if (this.me.role == 'teacher') {
                return true;
            }
        }

        randomColor() {
            let themeColor = ['#5cbae6', '#b6d957', '#fac364', '#8cd3ff', '#d998cb', '#f2d249', '#93b9c6', '#ccc5a8', '#52bacc', '#dbdb46', '#98aafb'];
            let xColor = Math.floor(Math.random() * themeColor.length);
            return themeColor[xColor];
        }

        openRunningModuleModal(ev, className) {
            this.$mdDialog.show({
                locals: {
                    className
                },
                controller: 'addRunningModuleCtrl',
                controllerAs: '$ctrl',
                templateUrl: 'client/app/classBlock/addRunningModuleModal.html',
                targetEvent: ev,
                clickOutsideToClose: true
            })
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