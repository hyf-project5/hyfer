import angular from 'angular';
import timelineModule from '../timeline.module';

const componentName = 'hyfTimelineRow';

angular.module(timelineModule)
    .component(componentName, {
        template: `
            <hyf-running-module
                ng-repeat="module in $ctrl.modules"
                module="module"
                selected-module="$ctrl.selectedModule"
                modules="$ctrl.modules"
                ng-click="$ctrl.onClick({module})">
            </hyf-running-module>`,
        bindings: {
            modules: '<',
            selectedModule: '<',
            onClick: '&'
        }
    });

export default componentName;