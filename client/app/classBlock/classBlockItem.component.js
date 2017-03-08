(function() {
    'use strict';
    class ClassBlockItemController {

        static get $inject() {
            return [];
        }

        constructor() {
            this.bgColor = this.randomColor();
        }

        randomColor() {
            let themeColor = ['#5cbae6', '#b6d957', '#fac364', '#8cd3ff', '#d998cb', '#f2d249', '#93b9c6', '#ccc5a8', '#52bacc', '#dbdb46', '#98aafb'];
            let xColor = Math.floor(Math.random() * themeColor.length);
            return themeColor[xColor];
        }
    }

    angular.module('hyferApp')
        .component('hyfClassBlockItem', {
            templateUrl: './app/classBlock/classBlockItem.component.html',
            controller: ClassBlockItemController,
            bindings: {
                className: '<'
            }
        });
})();