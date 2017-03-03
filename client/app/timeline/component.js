(function() {
    'use strict';

    angular
        .module('hyferApp')
        .component('hyfTimeline', {
            templateUrl: './app/timeline/view.html',
            controller: hyfTimelineController
        });

    hyfTimelineController.inject = [];

    function hyfTimelineController() {
        var ctrl = this;

    }
})();