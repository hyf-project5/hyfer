import angular from 'angular';

import toolbarModule from './toolbar.module';
import './menu/responsiveMenu.component';
import template from './toolbar.component.html';
import logoIcon from '../../assets/images/logo.png';

class ToolbarController {

    static get $inject() {
        return ['me', '$cookies', '$state'];
    }

    constructor(me, $cookies, $state) {
        this.me = me;
        this.$cookies = $cookies;
        this.$state = $state;
        this.logoIcon = logoIcon;
    }

    loadModules() {
        System.import('../modules/modules.routing')
            .then(() => this.$state.go('modules'));
    }

    isTeacher() {
        return this.me.role === 'teacher';
    }

    isUser() {
        return this.me.role !== 'visitor';
    }

    signin() {
        window.location.href = `/auth/github`;
    }

    signout() {
        window.localStorage.removeItem('token');
        this.$cookies.remove('token');
        location.reload();
        this.$state.go('timeline');
    }

}

const componentName = 'hyfToolbar';

angular
    .module(toolbarModule)
    .component(componentName, {
        template,
        controller: ToolbarController
    });

export default componentName;