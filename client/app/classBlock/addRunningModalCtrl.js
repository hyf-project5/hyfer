(function() {
    'use strict';

    class addRunningModuleCtrl {

        static get $inject() {
            return ['$mdDialog', 'backendService'];
        }

        constructor($mdDialog, backendService) {
            this.$mdDialog = $mdDialog;
            this.backendService = backendService;
            backendService.getTimeline()
                .then(data => {
                    this.timeline = data;
                    this.classNames = Object.keys(this.timeline).sort();
                    this.runningModules = this.timeline[this.classNames[0]];
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
            this.$mdDialog.hide(submit)
        }

    }

    angular.module('hyferApp')
        .controller('addRunningModuleCtrl', addRunningModuleCtrl);
})();