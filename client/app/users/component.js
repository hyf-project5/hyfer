(function() {
    'use strict';
    angular
        .module('hyferApp')
        .component('hyfUsers', {
            templateUrl: './client/app/users/view.html',
            controller: hyfUsersController
        });

    hyfUsersController.$inject = ['backendService'];

    function hyfUsersController(backendService) {
        var ctrl = this;

        backendService.getUsersProfile()
            .then(res => {
                ctrl.users = res;
            })
    }
})();