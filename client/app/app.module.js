import angular from 'angular'
import uiRouter from 'angular-ui-router'
import ngMaterial from 'angular-material'
import ngCookies from 'angular-cookies'
import 'angular-material/angular-material.css'
import 'angular-drag-and-drop-lists'
import 'angular-bootstrap-colorpicker'

import '../assets/scss/index.scss'
import toolbarModule from './toolbar/toolbar.module'
import timelineModule from './timeline/timeline.module'
import modulesModule from './modules/modules.module'
import usersModule from './users/users.module'
import modalsModule from './modals/modals.module'
import servicesModule from './services/services.module'
import directiveModules from './directives/directives.module'

export default angular.module('hyferApp', [
  uiRouter,
  ngMaterial,
  ngCookies,
  'dndLists',
  'colorpicker.module',
  toolbarModule,
  timelineModule,
  modulesModule,
  usersModule,
  modalsModule,
  servicesModule,
  directiveModules
]).name
