(function() {
    'use strict';
    angular
        .module('myApp')
        .component('homeLogin', {
            templateUrl: 'app/homeLogin/view.html',
            controller: controller
        });

    controller.$inject = ['$state'];

    function controller($state) {
        let ctrl = this;
        ctrl.submit = submit;
        ctrl.signin = signin;

        function submit(e) {
            console.log('the things: ' + ctrl.email + ' ' + ctrl.password)
            $state.go('modules')
        }

        function signin() {
            window.location.href = `/auth/github`
        }
    }
})();