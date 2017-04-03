import angular from 'angular';
import modulesModule from './modules.module';
import './modules-list-item-menu.component';
import '../directives/resizer.directive';
import template from './modules-list-item.component.html';

class ModulesListItemController {

    move() {
        this.onMove({ index: this.index });
    }

    onResized(width) {
        let listElem = document.querySelector('hyf-modules-list>ul');
        let listWidth = listElem.clientWidth;
        let duration = Math.round(width / listWidth * 6);
        if (duration > 0) {
            this.module.default_duration = Math.round(width / listWidth * 6);
            this.onChanged({ module: this.module });
        }
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