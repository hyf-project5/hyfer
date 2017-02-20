(function() {
    'use strict';
    angular
        .module('myApp')
        .component('toolbar', {
            templateUrl: 'app/toolbar/view.html',
            controller: toolbarCtrl
        });

    toolbarCtrl.inject = [];

    function toolbarCtrl() {
        let ctrl = this;

        ////////////////

        ctrl.onInit = function() {
            alert('HASAN SH..!!')
        };
        ctrl.onChanges = function(changesObj) {
            alert('HASAN SH..!!')
            console.log(changesObj)
        };
        ctrl.onDestory = function() {};
    }
})();