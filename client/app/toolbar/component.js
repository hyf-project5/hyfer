(function() {
    'use strict';
    angular
        .module('hyferApp')
        .component('hyfToolbar', {
            templateUrl: 'app/toolbar/view.html',
            controller: hyfToolbarCtrl
        });

    hyfToolbarCtrl.inject = [];

    function hyfToolbarCtrl() {
        let ctrl = this;

    }
})();