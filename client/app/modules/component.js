(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('hyferApp')
        .component('hyfModules', {
            templateUrl: 'client/app/modules/view.html',
            controller: hyfModulesCtrl
        });

    hyfModulesCtrl.$inject = ['backendService'];

    function hyfModulesCtrl(backendService) {
        let ctrl = this;
        backendService.getModules()
            .then(data => {
                ctrl.modules = data;
            })
            .catch(err => console.log(err));
    }
})();