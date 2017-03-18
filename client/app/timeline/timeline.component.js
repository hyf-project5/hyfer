import angular from 'angular';

import '../mainTimeline/mainTimeline.component';
import '../classBlock/classBlock.component';
import '../footer/footer.component';
import backendService from '../services/backendService';
import toastService from '../services/toastService';
import addAndUpdateModuleController from '../modals/modules/addAndUpdateModuleModalCtrl';

const timelineTemplate = require('./timeline.component.html');
const addClassTemplate = require('../modals/classes/addClassModal.html');

class TimelineController {

    static get $inject() {
        return ['$sce', '$mdDialog', '$state', toastService, 'me', backendService];
    }

    constructor($sce, $mdDialog, $state, toastService, me, backendService) {
        this.me = me;
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.backendService = backendService;
        this.toastService = toastService;
        setTimeout(() => {
            this.showFooter = true;
        }, 60)
    }

    $onInit() {
        this.classes = Object.keys(this.timeline)
    }

    addClassModal(ev) {
        this.$mdDialog.show({
                locals: {
                    selectedModule: null
                },
                controller: addAndUpdateModuleController,
                controllerAs: '$ctrl',
                template: addClassTemplate,
                targetEvent: ev,
                clickOutsideToClose: true
            })
            .then(group => {
                let classInfo = group.group_name.split('')[0].toUpperCase() + group.group_name.split('').slice(1).join('');
                classInfo = { group_name: classInfo, starting_date: group.starting_date };
                this.backendService.addGroup(classInfo)
                    .then((res) => {
                        this.toastService.displayToast(true, `${classInfo.group_name} has been added`);
                        this.$state.reload();
                    })
            })
            .catch(() => this.toastService.displayToast(false));
    }

    isTeacher() {
        return this.me.role === 'teacher';
    }

}

const componentName = 'hyfTimeline';

angular
    .module('hyferApp')
    .component(componentName, {
        template: timelineTemplate,
        controller: TimelineController,
        bindings: {
            timeline: '<'
        }
    });

export default componentName;