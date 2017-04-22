import angular from 'angular';

import timelineModule from '../timeline.module';
import timelineService from '../timeline.service';
import backendService from '../../services/backendService';
import toastService from '../../services/toastService';
import AddClassModalController from '../../modals/classes/addClass.controller';
import addClassTemplate from '../../modals/classes/addClassModal.html';
import timelineTemplate from './timeline.component.html';
import './timeline.scss';

class TimelineController {

    static get $inject() {
        return ['$sce', '$mdDialog', '$state', 'me', timelineService, backendService, toastService];
    }

    constructor($sce, $mdDialog, $state, me, timelineService, backendService, toastService) {
        this.me = me;
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.timelineService = timelineService;
        this.backendService = backendService;
        this.toastService = toastService;

        this.timelineService.setCallback(timeline => {
            this.timeline = timeline;
            this.composeTimeline();
        });

        setTimeout(() => {
            this.showFooter = true;
        }, 60);
    }

    $onInit() {
        document.getElementById('content').scrollTop = 0;
        this.composeTimeline();
    }

    composeTimeline() {
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
                    this.timelineService.notifyChanged();
                });
        }).catch(err => {
            console.log(err);
            this.toastService.displayToast(false);
        });
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