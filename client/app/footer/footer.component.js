import angular from 'angular';

import footerModule from './footer.module';
import template from './footer.component.html';
import logoIcon from '../../assets/images/logo.png';

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