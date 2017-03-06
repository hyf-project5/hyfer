(function() {
    'use strict';
    angular
        .module('hyferApp')
        .component('hyfHomeLogin', {
            templateUrl: 'app/homeLogin/view.html',
            controller: hyfHomeLoginCtrl
        });

    hyfHomeLoginCtrl.$inject = ['$state', '$cookies', 'me'];

    function hyfHomeLoginCtrl($state, $cookies, me) {
        let ctrl = this;
        ctrl.submit = submit;
        ctrl.signin = signin;
        ctrl.me = me;
        console.log($cookies.getAll())


        function submit(e) {
            console.log('the things: ' + ctrl.email + ' ' + ctrl.password)
            $state.go('modules')
        }

        function signin() {
            window.location.href = `/auth/github`
        }
    }
})();