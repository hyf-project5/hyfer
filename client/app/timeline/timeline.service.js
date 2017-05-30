import angular from 'angular'

import timelineModule from './timeline.module'

class TimeLineService {
  static get $inject() {
    return ['$rootScope']
  }

  constructor($rootScope) {
    this.$rootScope = $rootScope
  }

  getDateOfPastSunday(date) {
    const newDate = new Date(date)
    newDate.setHours(0, 0, 0, 0)
    const daysPastSunday = newDate.getDay()
    const dayOfMonth = newDate.getDate()
    newDate.setDate(dayOfMonth - daysPastSunday)
    return newDate
  }

  notifyTimelineChanged() {
    this.$rootScope.$broadcast('timelineChanged')
  }
}

const serviceName = 'timeLineService'

angular.module(timelineModule)
  .service(serviceName, TimeLineService)

export default serviceName
