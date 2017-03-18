import angular from 'angular';

import './menu/responsiveMenu.component';

const template = require('./toolbar.component.html');

class ToolbarController {

    static get $inject() {
        return ['me', '$cookies', '$state'];
    }

    constructor(me, $cookies, $state) {
        this.me = me;
        this.$cookies = $cookies;
        this.$state = $state;
    }

    isTeacher() {
        if (this.me.role == 'teacher') {
            return true;
        }
    }

    isUser() {
        return this.me.role !== 'visitor';
    }


    signin() {
        window.location.href = `/auth/github`
    }

    signout() {
        window.localStorage.removeItem('token');
        this.$cookies.remove('token');
        location.reload();
        this.$state.go('timeline')
    }

}

const componentName = 'hyfToolbar';

angular
    .module('hyferApp')
    .component(componentName, {
        template,
        controller: ToolbarController
    });

export default componentName;