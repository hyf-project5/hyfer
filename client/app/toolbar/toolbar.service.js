import angular from 'angular';

import toolbarModule from './toolbar.module';

class ToolbarService {

    static get $inject() {
        return ['$state'];
    }
    constructor($state) {
        this.$state = $state;
        this.listeners = [];
    }
    addListener(listener) {
        this.listeners.push(listener);
        console.log(listener);
    }

    getTitle() {
        return this.title;
    }

    switchToMain() {
        this.$state.go(this.backState);
        this.listeners.forEach(listener => listener('main'));
    }

    switchToChild(info) {
        this.title = info.title;
        this.backState = info.backState;
        this.listeners.forEach(listener => listener('child'));
    }
}

const serviceName = 'toolbarService';

angular
    .module(toolbarModule)
    .service(serviceName, ToolbarService);

export default serviceName;