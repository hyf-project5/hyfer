import angular from 'angular';

import usersModule from './users.module';
import backendService from '../services/backendService';
import template from './profile.component.html';
import toolbarService from '../toolbar/toolbar.service';
import freecodecamp from '../../assets/images/freecodecamp.svg';

class ProfileController {

    static get $inject() {
        return ['$timeout', '$state', '$stateParams', toolbarService, backendService];
    }

    constructor($timeout, $state, $stateParams, toolbarService, backendService) {
        this.toolbarService = toolbarService;
        this.toolbarService.switchToChild({
            title: 'Edit Profile',
            backState: 'users',
            position: $stateParams.position
        });
        this.backendService = backendService;
        this.$timeout = $timeout;
        this.freecodecamp = freecodecamp;
        this.$state = $state;
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
        }, 1000)
    }

    save(assignedClass) {
        if (assignedClass) {
            this.user.group_name = assignedClass.name;
            this.user.group_id = assignedClass.group_id;
        }

        this.backendService.updateState(this.user);

    }
    
    cancelChanges() {
        this.$state.reload();
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