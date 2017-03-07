(function() {
    'use strict';
    angular
        .module('hyferApp')
        .component('hyfUsers', {
            templateUrl: './client/app/users/view.html',
            controller: hyfUsersController
        });

    hyfUsersController.$inject = ['backendService', '$mdToast', 'me', '$state'];

    function hyfUsersController(backendService, $mdToast, me, $state) {
        // let this = this;
        if (me.role !== 'teacher') {
            alert('access denied!!')
            return $state.go('timeline')
        }
        backendService.getUsersProfile()
            .then(res => {
                this.users = res;
            }).catch(err => console.log(err))

        this.selectedRole = function(userId, role) {
            backendService.updateUserRole(userId, role.toLowerCase())
                .then(() => {
                    this.users.forEach(user => {
                        if (user.id == userId) {
                            user.role = role.toLowerCase();
                            $mdToast.show(
                                $mdToast.simple()
                                .textContent(`${user.username}'s role updated to ${role.toLowerCase()}!`)
                                .position('right')
                                .hideDelay(3000)
                                .action('Close')
                                .highlightAction(true)
                                .highlightClass('md-warn')
                            );
                        }
                    })
                })
        }
    }
})();