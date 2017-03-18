import angular from 'angular';

const template = require('./footer.component.html');
const logoIcon = require('../../assets/images/logo.png');

class FooterController {

    static get $inject() {
        return [];
    }

    constructor() {
        this.logoIcon = logoIcon;
    }
}

const componentName = 'hyfFooter';

angular.module('hyferApp')
    .component(componentName, {
        template,
        controller: FooterController
    });

export default componentName;