(function() {
    'use strict';
    angular
        .module('hyferApp')
        .component('toolbar', {
            templateUrl: 'app/toolbar/view.html',
            controller: toolbarCtrl
        });

    toolbarCtrl.inject = [];

    function toolbarCtrl() {
        let ctrl = this;

    }
})();