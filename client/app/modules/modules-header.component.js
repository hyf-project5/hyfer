import angular from 'angular';
import modulesModule from './modules.module';

class ModulesHeaderController {

    constructor() {
        this.weeksGrid = ['1 week', '2 weeks', '3 weeks', '4 weeks', '5 weeks', '6 weeks'];
    }

}

const componentName = 'hyfModulesHeader';

angular.module(modulesModule)
    .component(componentName, {
        template:
            `<md-grid-list md-cols="6" md-row-height="45px" md-row-width="12vw" md-gutter="0px">
                <md-grid-tile ng-repeat="week in $ctrl.weeksGrid">{{week}}</md-grid-tile>
            </md-grid-list>`,
        controller: ModulesHeaderController
    });

export default componentName;