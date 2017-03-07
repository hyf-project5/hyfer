(function() {
    'use strict';

    class ModulesController {

        static get $inject() {
            return ['backendService', 'me', '$state'];
        }

        constructor(backendService, me, $state) {
            if (me.role !== 'teacher') {
                alert('access denied!!')
                return $state.go('timeline')
            }
            this.backendService = backendService;
            backendService.getModules()
                .then(data => {
                    this.modules = data;
                })
                .catch(err => console.log(err));
        }

    }

    angular.module('hyferApp')
        .component('hyfModules', {
            templateUrl: 'client/app/modules/modules.component.html',
            controller: ModulesController
        });
})();