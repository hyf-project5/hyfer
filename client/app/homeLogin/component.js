(function() {
    'use strict';
    angular
        .module('hyferApp')
        .component('homeLogin', {
            templateUrl: 'app/homeLogin/view.html',
            controller: controller
        });

    controller.$inject = ['$state', '$cookies'];

    function controller($state, $cookies) {
        let ctrl = this;
        ctrl.submit = submit;
        ctrl.signin = signin;
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