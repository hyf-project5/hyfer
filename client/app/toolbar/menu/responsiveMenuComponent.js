(function() {
    'use strict';

    class responsiveMenuComponent {

        static get $inject() {
            return ['me'];
        }

        constructor(me) {
            this.me = me;
        }
        isTeacher() {
            if (this.me.role == 'teacher') {
                return true;
            }
        }

        isUser() {
            if (this.me.role == 'visitor') {
                return false;
            };
            return true;
        }

    }

    angular
        .module('hyferApp')
        .component('responsiveMenuComponent', {
            templateUrl: 'app/toolbar/menu/responsiveMenu.html',
            controller: responsiveMenuComponent
        });

})();