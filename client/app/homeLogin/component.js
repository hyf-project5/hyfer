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


        function submit(e) {
            console.log('the things: ' + ctrl.email + ' ' + ctrl.password)
            $state.go('modules')

        }
    }
})();