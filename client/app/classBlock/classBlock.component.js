(function() {
    'use strict';
    class ClassBlockController {

        static get $inject() {
            return ['backendService'];
        }

        constructor(backendService) {
            this.backendService = backendService;

        }

    }

    angular.module('hyferApp')
        .component('hyfClassBlock', {
            templateUrl: './app/classBlock/classBlock.component.html',
            controller: ClassBlockController,
            bindings: {
                classes: '<'
            }
        });
})();