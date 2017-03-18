import angular from 'angular';

const template = require('./responsiveMenu.component.html');


class ResponsiveMenuComponent {

    static get $inject() {
        return ['me'];
    }

    constructor(me) {
        this.me = me;
    }
    isTeacher() {
        if (this.me.role == 'teacher') {
            return true;
        }
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