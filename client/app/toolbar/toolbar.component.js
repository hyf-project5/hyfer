import angular from 'angular';

import toolbarModule from './toolbar.module';
import './menu/responsiveMenu.component';
import template from './toolbar.component.html';
import logoIcon from '../../assets/images/logo.png';
import toolbarService from './toolbar.service'; 
class ToolbarController {

    static get $inject() {
        return ['me', '$cookies', '$state', toolbarService];
    }

    constructor(me, $cookies, $state,toolbarService) {
        this.me = me;
        this.$cookies = $cookies;
        this.$state = $state;
        this.logoIcon = logoIcon;
        this.toolbarService = toolbarService;
        this.toolbarService.addListener(this.onNotification.bind(this));
        this.show = true;
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

    goto(state) {
        this.$state.go(state);
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

       onNotification(toolbarName) {
        console.log('MainToolbar onNotification: ' + toolbarName);
        if (toolbarName === 'main') {
             this.show = true;
        } else {
            this.show = false;
        }
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