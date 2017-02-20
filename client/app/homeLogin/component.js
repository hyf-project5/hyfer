(function() {
    'use strict';
    angular
        .module('myApp')
        .component('homeLogin', {
            templateUrl: 'app/homeLogin/view.html',
            controller: controller,
            bindings: {
                Binding: '=',
            },
        });

    controller.inject = [];

    function controller() {
        let ctrl = this;

        ctrl.onInit = function() {};
        ctrl.onChanges = function(changesObj) {};
        ctrl.onDestory = function() {};
    }
})();