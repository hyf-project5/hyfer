(function() {
    'use strict';

    class hyfUsersCtrl {
        static get $inject() {
            return ['backendService', '$mdToast', 'me', '$state', '$mdDialog'];
        }
        constructor(backendService, $mdToast, me, $state, $mdDialog) {
            backendService.getUsersProfile()
                .then(res => {
                    console.log(me)
                    this.users = res;
                })
                .catch(err => {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Access Denied!')
                        .textContent('Sorry this is private page!')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('close')
                    );
                    return $state.go('timeline')
                })
            this.backendService = backendService;
            this.$mdToast = $mdToast;
            this.me = me;
            this.$mdDialog = $mdDialog;
            this.$state = $state;
        }

        updateUserRole(userId, role) {
            this.backendService.updateUserRole(userId, role.toLowerCase())
                .then(() => {
                    this.users.forEach(user => {
                        if (user.id == userId) {
                            user.role = role.toLowerCase();
                            this.$mdToast.show(
                                this.$mdToast.simple()
                                .textContent(`${user.username}'s role updated to ${role.toLowerCase()}!`)
                                .position('right')
                                .hideDelay(3000)
                                .action('Close')
                                .highlightAction(true)
                                .highlightClass('md-warn')
                            );
                        }
                    })
                }).catch(err => console.log(err))
        }

        updateMyRole(userName, ev, userId, role) {
            let confirm = this.$mdDialog.confirm()
                .title('Would you like to update your role?')
                .ariaLabel('Update your role!')
                .targetEvent(ev)
                .ok('Ok')
                .cancel('Cancel');
            this.$mdDialog.show(confirm)
                .then(() => {
                    this.updateUserRole(userId, role)
                    location.reload();
                    this.$state.go('timeline')
                })
                .catch(() => false)
        }
        selectedRole(userId, role, username, ev) {
            if (this.me.username === username) {
                if (!this.updateMyRole(username, ev, userId, role)) {
                    console.log('nooo')
                    return;
                };
            }
            this.updateUserRole(userId, role);

        }

    }

    angular
        .module('hyferApp')
        .component('hyfUsers', {
            templateUrl: './client/app/users/view.html',
            controller: hyfUsersCtrl
        });
})();