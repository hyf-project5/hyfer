import angular from 'angular';

import usersModule from './users.module';
import backendService from '../services/backendService';
import template from './profile.component.html';
import toolbarService from '../toolbar/toolbar.service';
import freecodecamp from '../../assets/images/freecodecamp.svg';

class ProfileController {

    static get $inject() {
        return ['$timeout', toolbarService, backendService];
    }

    constructor($timeout, toolbarService, backendService) {
        this.toolbarService = toolbarService;
        this.toolbarService.switchToChild({
            title: 'Edit Profile',
            backState: 'users'
        });
        this.backendService = backendService;
        this.$timeout = $timeout;
        this.freecodecamp = freecodecamp;
    }

    getGroupsNameId() {
        return this.$timeout(() => {
            this.backendService.getTimeline()
                .then(res => {
                    let classesName = Object.entries(res);
                    this.classes = classesName.reduce((acc, curr) => {
                        let classNameAndId = {
                            name: curr[0],
                            group_id: curr[1][0].id
                        }
                        acc.push(classNameAndId);
                        return acc;
                    }, [])
                    console.log(this.classes)
                })
        }, 400)
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