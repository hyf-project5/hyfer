import angular from 'angular';

import './classBlockItem.component';

const template = require('./classBlock.component.html');

class ClassBlockController {

    static get $inject() {
        return ['backendService'];
    }

    constructor(backendService) {
        this.backendService = backendService;

    }

}

const componentName = 'hyfClassBlock';

angular.module('hyferApp')
    .component(componentName, {
        template,
        controller: ClassBlockController,
        bindings: {
            classes: '<'
        }
    });

export default componentName;