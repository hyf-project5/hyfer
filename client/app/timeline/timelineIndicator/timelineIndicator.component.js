import angular from 'angular'

import timelineModule from '../timeline.module'
import timelineService from '../timeline.service'
import backendService from '../../services/backendService'
import template from './timelineIndicator.component.html'
import './timelineIndicator.scss'

const MSECS_PER_DAY = 1000 * 60 * 60 * 24
const INDICATOR_OFFSET = 250

class TimelineIndicatorController {

  static get $inject() {
    return ['$rootScope', timelineService, backendService]
  }

  constructor($rootScope, timelineService, backendService) {
    this.timelineService = timelineService
    this.backendService = backendService

    $rootScope.$on('scrollToToday', () => {
      this._scrollToToday()
    })
  }

  $postLink() {
    this._scrollToToday()
  }

  _scrollToToday() {
    this.currentDate = new Date()
    this.todayPosition = this.currentDate.getTime()
    const classNames = Object.keys(this.timeline)
    const firstClassName = classNames[0]
    const firstRunningModule = this.timeline[firstClassName][0]
    const firstStartingDate = new Date(firstRunningModule.starting_date)
    const firstSundayDate = this.timelineService.getDateOfPastSunday(firstStartingDate)
    const zeroPoint = firstSundayDate.getTime()

    this.indicatorHeight = (classNames.length * 60) + 20
    this.indicatorPosition = (this.todayPosition - zeroPoint) / MSECS_PER_DAY * 9 + 125

    const scrollToLeft = this.indicatorPosition - INDICATOR_OFFSET

    setTimeout(() => {
      const slider = document.getElementById('timeline-slider')
      slider.scrollLeft = scrollToLeft
      slider.classList.remove('slider-hide')
    })

  }
}

const componentName = 'hyfTimelineIndicator'

angular.module(timelineModule)
  .component(componentName, {
    template,
    bindings: {
      timeline: '<'
    },
    controller: TimelineIndicatorController
  })

export default componentName
