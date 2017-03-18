import angular from 'angular';

import timelineModule from '../timeline.module';
import addAndUpdateRunningModuleController from '../../modals/runningModules/addAndUpdateRunningModuleModalCtrl';
import addRunningTemplate from '../../modals/runningModules/addRunningModuleModal.html';
import template from './classBlockItem.component.html';

class ClassBlockItemController {

    static get $inject() {
        return ['$mdDialog', 'backendService', 'me'];
    }

    constructor($mdDialog, backendService, me) {
        this.bgColor = this.randomColor();
        this.$mdDialog = $mdDialog;
        this.me = me;
    }

    isTeacher() {
        if (this.me.role == 'teacher') {
            return true;
        }
    }

    randomColor() {
        let themeColor = ['#5cbae6', '#b6d957', '#fac364', '#8cd3ff', '#d998cb', '#f2d249', '#93b9c6', '#ccc5a8', '#52bacc', '#dbdb46', '#98aafb'];
        let xColor = Math.floor(Math.random() * themeColor.length);
        return themeColor[xColor];
    }

    addRunningModuleModal(ev, className) {
        this.$mdDialog.show({
            locals: {
                className,
                selectedRunningModule: null
            },
            controller: addAndUpdateRunningModuleController,
            controllerAs: '$ctrl',
            template: addRunningTemplate,
            targetEvent: ev,
            clickOutsideToClose: true
        })
    }

}

const componentName = 'hyfClassBlockItem';

angular.module(timelineModule)
    .component(componentName, {
        template,
        controller: ClassBlockItemController,
        bindings: {
            className: '<'
        }
    });

export default componentName;