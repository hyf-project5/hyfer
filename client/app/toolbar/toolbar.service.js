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
    }

    getTitle() {
        return this.title;
    }

    getPosition(){
        return this.position;
    }

    switchToMain() {
        this.$state.go(this.backState, {'position': this.position});
        this.listeners.forEach(listener => listener('main'));
    }

    switchToChild(info) {
        this.title = info.title;
        this.backState = info.backState;
        this.position = info.position;
        this.listeners.forEach(listener => listener('child'));
    }
}

const serviceName = 'toolbarService';

angular
    .module(toolbarModule)
    .service(serviceName, ToolbarService);

export default serviceName;