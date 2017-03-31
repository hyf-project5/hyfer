import angular from 'angular';
import modulesModule from './modules.module';
import './modules-list-item-menu.component';
import template from './modules-list-item.component.html';

class ModulesListItemController {

    move() {
        this.onMove({ index: this.index });
    }
}

const componentName = 'hyfModulesListItem';

angular.module(modulesModule)
    .component(componentName, {
        template,
        controller: ModulesListItemController,
        bindings: {
            module: '<',
            index: '<',
            onDelete: '&',
            onMove: '&',
            onChanged: '&'
        }
    });

export default componentName;