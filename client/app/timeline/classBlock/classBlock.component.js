import angular from 'angular';

import timelineModule from '../timeline.module';
import './classBlockItem.component';
import template from './classBlock.component.html';

class ClassBlockController {

    static get $inject() {
        return ['backendService'];
    }

    constructor(backendService) {
        this.backendService = backendService;

    }

}

const componentName = 'hyfClassBlock';

angular.module(timelineModule)
    .component(componentName, {
        template,
        controller: ClassBlockController,
        bindings: {
            classes: '<'
        }
    });

export default componentName;