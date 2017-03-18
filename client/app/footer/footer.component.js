import angular from 'angular';

const template = require('./footer.component.html');

class FooterController {

    static get $inject() {
        return [];
    }

    constructor() {

    }
}

const componentName = 'hyfFooter';

angular.module('hyferApp')
    .component(componentName, {
        template,
        controller: FooterController
    });

export default componentName;