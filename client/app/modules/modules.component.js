(function() {
    'use strict';

    class ModulesController {

        static get $inject() {
            return ['backendService'];
        }

        constructor(backendService) {
            this.backendService = backendService;
            backendService.getModules()
                .then(data => {
                    this.modules = data;
                })
                .catch(err => console.log(err));
        }

        someFunctionUsedInTheView() {
            // do something
        }
    }

    angular.module('hyferApp')
        .component('hyfModules', {
            templateUrl: 'client/app/modules/modules.component.html',
            controller: ModulesController
        });
})();