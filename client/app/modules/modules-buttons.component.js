import angular from 'angular';
import modulesModule from './modules.module';

import template from './modules-buttons.component.html';

const componentName = 'hyfModulesButtons';

angular.module(modulesModule)
    .component(componentName, {
        template,
        bindings: {
            isDirty: '<',
            onSave: '&',
            onUndoChanges: '&',
            onAddModule: '&'
        }
    });

export default componentName;