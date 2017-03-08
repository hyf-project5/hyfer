(function() {
    'use strict';
    class FooterController {

        static get $inject() {
            return [];
        }

        constructor() {
            console.log('start the footer');
        }
    }

    angular.module('hyferApp')
        .component('hyfFooter', {
            templateUrl: './app/footer/footer.component.html',
            controller: FooterController
        });
})();