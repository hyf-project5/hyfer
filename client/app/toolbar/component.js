(function() {
    'use strict';

    class hyfToolbarCtrl {

        static get $inject() {
            return ['me', '$cookies', '$state'];
        }

        constructor(me, $cookies, $state) {
            this.me = me;
            this.$cookies = $cookies;
            this.$state = $state;
        }

        isTeacher() {
            if (this.me.role == 'teacher') {
                return true;
            }
        }

        isUser() {
            if (this.me.username == 'anonymous') {
                return false;
            };
            return true;
        }


        signin() {
            window.location.href = `/auth/github`
        }

        signout() {
            window.localStorage.removeItem('token');
            this.$cookies.remove('token');
            location.reload();
            this.$state.go('timeline')
        }

    }

    angular
        .module('hyferApp')
        .component('hyfToolbar', {
            templateUrl: 'app/toolbar/view.html',
            controller: hyfToolbarCtrl
        });

})();