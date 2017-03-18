import angular from 'angular';

import footerModule from './footer.module';

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

angular.module(footerModule)
    .component(componentName, {
        template,
        controller: FooterController
    });

export default componentName;