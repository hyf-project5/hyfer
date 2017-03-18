import angular from 'angular';

import template from './responsiveMenu.component.html';

class ResponsiveMenuComponent {

    static get $inject() {
        return ['me'];
    }

    constructor(me) {
        this.me = me;
    }

    isTeacher() {
        return this.me.role === 'teacher';
    }

    isUser() {
        return this.me.role !== 'visitor';
    }

}

const componentName = 'responsiveMenuComponent';

angular
    .module('hyferApp')
    .component(componentName, {
        template,
        controller: ResponsiveMenuComponent
    });

export default componentName;