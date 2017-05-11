import angular from 'angular'

import timelineModule from '../timeline.module'
import template from './classBlock.component.html'
import './classBlock.scss'

const componentName = 'hyfClassBlock'

angular.module(timelineModule)
  .component(componentName, {
    template,
    bindings: {
      classNames: '<'
    }
  })

export default componentName
