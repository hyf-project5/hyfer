import angular from 'angular'
import toastService from '../../services/toastService'

import timelineModule from '../timeline.module'
import template from './readme.component.html'
import backendService from '../../services/backendService'
import githubIcon from '../../../assets/images/github.svg'
import './readme.scss'

class ReadmeController {
  static get $inject() {
    return ['$sce', toastService, backendService]
  }

  constructor($sce, toastService, backendService) {
    this.$sce = $sce
    this.toastService = toastService
    this.backendService = backendService
    this.githubIcon = githubIcon
    this.content = null
  }

  $onChanges(changes) {
    if (changes.selectedModule) {
      this.selectedModule = changes.selectedModule.currentValue
      this.gitUrl = this.selectedModule.git_url + this.selectedModule.git_repo

      if (!this.selectedModule.git_repo) {
        this.toastService.displayToast(true, 'This selected module has no repository available.')
        this.content = null
        return
      }

      this.backendService.getReadme(this.selectedModule.git_repo)
        .then(res => this.content = this.$sce.trustAsHtml(res))
        .catch(err => console.log(err.statusText))
    }
  }
}

const componentName = 'hyfReadme'

angular.module(timelineModule)
  .component(componentName, {
    template,
    bindings: {
      selectedModule: '<'
    },
    controller: ReadmeController
  })

export default componentName
