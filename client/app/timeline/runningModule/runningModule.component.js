import angular from 'angular';

import timelineModule from '../timeline.module';
import timelineService from '../timeline.service';
import template from './runningModule.component.html';
import backendService from '../../services/backendService';
import addAndUpdateRunningModuleModalCtrl from '../../modals/runningModules/addAndUpdateRunningModuleModalCtrl';
import editRunningModuleTemplate from '../../modals/runningModules/editRunningModuleModal.html';
import './runningModule.scss';

class RunningModuleController {

    static get $inject() {
        return ['$state', '$mdDialog', 'me', timelineService, backendService];
    }

    constructor($state, $mdDialog, me, timelineService, backendService) {
        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.me = me;
        this.timelineService = timelineService;
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
            .then(() => this.timelineService.notifyChanged())
            .catch(err => console.log(err));
    }

    isTeacher() {
        return this.me.role === 'teacher';
    }

    moveLeft() {
        const position = this.module.position - 1;
        this.backendService.updateRunningModule(this.module.id, this.module.position, { position })
            .then(() => {
                this.timelineService.notifyChanged();
            })
            .catch(err => console.log(err));
    }

    moveRight() {
        const position = this.module.position + 1;
        this.backendService.updateRunningModule(this.module.id, this.module.position, { position })
            .then(() => {
                this.timelineService.notifyChanged();
            })
            .catch(err => console.log(err));
    }

    weekShorter() {
        const duration = this.module.duration - 1;
        this.backendService.updateRunningModule(this.module.id, this.module.position, { duration })
            .then(() => {
                this.timelineService.notifyChanged();
            })
            .catch(err => console.log(err));
    }

    weekLonger() {
        const duration = this.module.duration + 1;
        this.backendService.updateRunningModule(this.module.id, this.module.position, { duration })
            .then(() => {
                this.timelineService.notifyChanged();
            })
            .catch(err => console.log(err));
    }
}

const componentName = 'hyfRunningModule';

angular.module(timelineModule)
    .component(componentName, {
        template,
        bindings: {
            module: '<',
            modules: '<',
            onClick: '&'
        },
        controller: RunningModuleController
    });

export default componentName;