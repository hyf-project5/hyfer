(function () {
    'use strict';
    class ClassBlockItemController {

        static get $inject() {
            return ['backendService'];
        }

        constructor(backendService) {
            this.backendService = backendService;
            backendService.getTimeline()
                .then(data => {
                    this.timeline = data;
                    this.classesList = Object.keys(this.timeline).sort();
                    this.classes = [];
                    for (var i = 0; i < this.classesList.length; i++) {
                        let singleClass = { 'name': this.classesList[i], 'bgColor': randomColor() };
                        this.classes.push(singleClass);
                    };
                })
                .catch(err => console.log(err));
        }
    }
    function randomColor() {
        let themeColor = ['#5cbae6', '#b6d957', '#fac364', '#8cd3ff', '#d998cb', '#f2d249', '#93b9c6', '#ccc5a8', '#52bacc', '#dbdb46', '#98aafb'];
        let xColor = Math.floor(Math.random() * themeColor.length);
        return themeColor[xColor];
    }

    angular.module('hyferApp')
        .component('hyfClassBlockItem', {
            templateUrl: 'client/app/classBlockItem/classBlockItem.component.html',
            controller: ClassBlockItemController
        });
})();