(function() {
    'use strict';

    class hyfToolbarCtrl {

        static get $inject() {
            return ['me'];
        }

        constructor(me) {
            this.me = me;
        }

        notTeacher() {
            if (this.me.role !== 'teacher') {
                return true;
            }
        }


    }

    angular
        .module('hyferApp')
        .component('hyfToolbar', {
            templateUrl: 'app/toolbar/view.html',
            controller: hyfToolbarCtrl
        });

})();