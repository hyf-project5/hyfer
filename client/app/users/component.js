(function() {
    'use strict';

    class hyfUsersCtrl {
        static get $inject() {
            return ['backendService', 'me', '$state', '$mdDialog', 'toastService'];
        }
        constructor(backendService, me, $state, $mdDialog, toastService) {
            backendService.getUsersProfile()
                .then(res => {
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
            this.me = me;
            this.$mdDialog = $mdDialog;
            this.$state = $state;
            this.toastService = toastService;
        }

        updateUserRole(userId, role) {
            this.backendService.updateUserRole(userId, role.toLowerCase())
                .then(() => {
                    this.users.forEach(user => {
                        if (user.id == userId) {
                            this.toastService.displayToast(true, `${user.username}'s role updated to ${role.toLowerCase()}!`)
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