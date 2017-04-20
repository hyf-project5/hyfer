import angular from 'angular';

import timelineModule from '../timeline.module';
import backendService from '../../services/backendService';
import toastService from '../../services/toastService';
import AddClassModalController from '../../modals/classes/addClass.controller';
import addClassTemplate from '../../modals/classes/addClassModal.html';
import timelineTemplate from './timeline.component.html';
import './timeline.scss';

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
        this.classNames = Object.keys(this.timeline);
        this.selectedModule = this.timeline[this.classNames[0]][0];

        this.height = (this.classNames.length * 60) + 40;

    }

    onModuleClick(module) {
        this.selectedModule = module;
    }

    addClassModal(ev) {
        this.$mdDialog.show({
            controller: AddClassModalController,
            controllerAs: '$ctrl',
            template: addClassTemplate,
            targetEvent: ev,
            clickOutsideToClose: true
        }).then(group => {
            if (!group.starting_date) {
                return this.toastService.displayToast(true, `Please supply starting date`);
            }
            let classInfo = group.group_name.split('')[0].toUpperCase() + group.group_name.split('').slice(1).join('');
            classInfo = { group_name: classInfo, starting_date: group.starting_date };
            this.backendService.addGroup(classInfo)
                .then(() => {
                    this.toastService.displayToast(true, `${classInfo.group_name} has been added`);
                    this.$state.reload();
                });
        }).catch(() => this.toastService.displayToast(false));
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