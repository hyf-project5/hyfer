import angular from 'angular';

import timelineModule from './timeline.module';
import './mainTimeline.component';
import './classBlock/classBlock.component';
import '../footer/footer.component';
import backendService from '../services/backendService';
import toastService from '../services/toastService';
import AddClassModalController from '../modals/classes/addClass.controller';
import timelineTemplate from './timeline.component.html';
import addClassTemplate from '../modals/classes/addClassModal.html';

class TimelineController {

    static get $inject() {
        return ['$sce', '$mdDialog', '$state', 'me', backendService, toastService];
    }

    constructor($sce, $mdDialog, $state, me, backendService, toastService) {
        this.me = me;
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.backendService = backendService;
        this.toastService = toastService;
        setTimeout(() => {
            this.showFooter = true;
        }, 60);
    }

    $onInit() {
        this.classes = Object.keys(this.timeline);
    }

    addClassModal(ev) {
        this.$mdDialog.show({
                locals: {
                    selectedModule: null
                },
                controller: AddClassModalController,
                controllerAs: '$ctrl',
                template: addClassTemplate,
                targetEvent: ev,
                clickOutsideToClose: true
            })
            .then(group => {
                console.log('group: ', group);
                let classInfo = group.group_name.split('')[0].toUpperCase() + group.group_name.split('').slice(1).join('');
                classInfo = { group_name: classInfo, starting_date: group.starting_date };
                this.backendService.addGroup(classInfo)
                    .then(() => {
                        this.toastService.displayToast(true, `${classInfo.group_name} has been added`);
                        this.$state.reload();
                    });
            })
            .catch(() => this.toastService.displayToast(false));
    }

    isTeacher() {
        return this.me.role === 'teacher';
    }

}

const componentName = 'hyfTimeline';

angular
    .module(timelineModule)
    .component(componentName, {
        template: timelineTemplate,
        controller: TimelineController,
        bindings: {
            timeline: '<'
        }
    });

export default componentName;