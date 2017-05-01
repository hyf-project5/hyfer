import angular from 'angular'
import modulesModule from './modules.module'
import './module-list-item-menu.component'
import '../directives/resizer.directive'
import template from './module-list-item.component.html'

class ModulesListItemController {
  move() {
    this.onMove({ index: this.index })
  }

  onResized(width) {
    const duration = Math.round(width / this.weekWidth)
    if (duration > 0) {
      this.module.default_duration = duration
      this.onChanged({ module: this.module })
    }
  }

  getWidth() {
    const width = this.module.default_duration * this.weekWidth
    return `${width}px`
  }
}

const componentName = 'hyfModuleListItem'

angular.module(modulesModule)
  .component(componentName, {
    template,
    controller: ModulesListItemController,
    bindings: {
      module: '<',
      moduleInfo: '<',
      index: '<',
      weekWidth: '<',
      onDelete: '&',
      onMove: '&',
      onChanged: '&'
    }
  })

export default componentName
