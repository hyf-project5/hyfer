(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('hyferApp')
        .component('modules', {
            templateUrl: 'client/app/modules/view.html',
            controller: modulesCtrl
        });

    modulesCtrl.inject = ['backendService'];

    function modulesCtrl(backendService) {
        let ctrl = this;
        backendService.getModules()
            .then(data => {
                ctrl.modules = data;
            })
            .catch(err => console.log(err));
    }
})();