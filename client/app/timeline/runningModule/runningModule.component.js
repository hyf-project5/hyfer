import angular from 'angular';

import timelineModule from '../timeline.module';
import template from './runningModule.component.html';
import backendService from '../../services/backendService';
import addAndUpdateRunningModuleModalCtrl from '../../modals/runningModules/addAndUpdateRunningModuleModalCtrl';
import editRunningModuleTemplate from '../../modals/runningModules/editRunningModuleModal.html';
import './runningModule.scss';

class RunningModuleController {

    static get $inject() {
        return ['$state', '$mdDialog', 'me', backendService];
    }

    constructor($state, $mdDialog, me, backendService) {
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.me = me;
        this.backendService = backendService;
    }

    editRunningModule(ev, module) {
        this.$mdDialog.show({
            locals: {
                className: module.group_name,
                selectedRunningModule: module
            },
            controller: addAndUpdateRunningModuleModalCtrl,
            controllerAs: '$ctrl',
            template: editRunningModuleTemplate,
            targetEvent: ev,
            clickOutsideToClose: true
        });
    }

    splitRunningModule(module) {
        this.backendService.splitRunningModule(module.id, module.position)
            .then(() => this.$state.reload())
            .catch(err => console.log(err));
    }

    isTeacher() {
        return this.me.role === 'teacher';
    }

}

const componentName = 'hyfRunningModule';

angular.module(timelineModule)
    .component(componentName, {
        template,
        bindings: {
            module: '<',
            onClick: '&'
        },
        controller: RunningModuleController
    });

export default componentName;