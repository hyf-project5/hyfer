(function() {
    'use strict';
    class ClassBlockController {

        static get $inject() {
            return ['backendService'];
        }

        constructor(backendService) {
            this.backendService = backendService;
            backendService.getTimeline()
                .then(data => {
                    this.timeline = data;
                    this.classNames = Object.keys(this.timeline);
                })
                .catch(err => console.log(err));
        }
    }

    angular.module('hyferApp')
        .component('hyfClassBlock', {
            templateUrl: './app/classBlock/classBlock.component.html',
            controller: ClassBlockController
        });
})();