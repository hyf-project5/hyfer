(function() {
    'use strict';
    class FooterController {

        static get $inject() {
            return [];
        }

        constructor() {

        }
    }

    angular.module('hyferApp')
        .component('hyfFooter', {
            templateUrl: './app/footer/footer.component.html',
            controller: FooterController
        });
})();