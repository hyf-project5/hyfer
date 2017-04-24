import angular from 'angular';

import usersModule from './users.module';
import backendService from '../services/backendService';
import template from './profile.component.html';
import toolbarService from '../toolbar/toolbar.service';
import freecodecamp from '../../assets/images/freecodecamp.svg';

class ProfileController{

    static get $inject() {
        return [toolbarService];
    }
    
    constructor(toolbarService){
        this.toolbarService = toolbarService;
        this.toolbarService.switchToChild({
            title: 'Edit Profile',
            backState: 'users'
        });
        this.freecodecamp =freecodecamp;
    }

}

 const componentName = 'hyfProfile';

    angular
    .module(usersModule)
    .component(componentName, {
        template,
        controller: ProfileController,
        bindings: {
            user: '<'
        }
    });

    export default componentName;