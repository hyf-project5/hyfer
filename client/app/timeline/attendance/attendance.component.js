import angular from 'angular'

import timelineModule from '../timeline.module'
import backendService from '../../services/backendService'
import toastService from '../../services/toastService'
import template from './attendance.component.html'
import './attendance.scss'

const MSECS_PER_WEEK = 1000 * 60 * 60 * 24 * 7

class AttendanceCardController {
  static get $inject() {
    return ['me', backendService, toastService]
  }

  constructor(me, backendService, toastService) {
    this.backendService = backendService
    this.me = me
    this.toastService = toastService
  }

  $onChanges(changes) {
    if (!changes.selectedModule) {
      return
    }
    this.selectedModule = changes.selectedModule.currentValue
    const selectedModuleDate = new Date(this.selectedModule.startingDate).getTime()
    this.futureModule = selectedModuleDate > Date.now()
    this.getHistory(this.selectedModule)
  }

  getHistory(module) {
    this.moduleSundays = this._getSundayDates(module.startingDate, module.duration)
    this.historyobj = {
      classname: module.group_name,
      rmName: module.module_name
    }
    this.backendService.getHistory(module.running_module_id, module.id, this.moduleSundays)
      .then(res => {
        const keys = Object.keys(res.data)
        this._students = {}
        for (const student of keys) {
          for (const val of res.data[student]) {
            const obj = {
              _full_name: val.full_name,
              _date: val.date,
              _attendance: val.attendance,
              _homework: val.homework
            }
            this._students[val.full_name + '_' + val.date] = obj
          }
        }
        this.attendants = res.data
      })
      .catch(err => console.log(err))
  }

  changeInStudentsHistory() {
    this.toggle = true
  }

  saveHistory() {
    this.backendService.saveHistory(this.attendants)
      .then(() => this.toastService.displayToast(true, 'Your changes have been saved'))
      .catch(err => console.log(err))
    this.toggle = false
  }

  cancelChanges() {
    for (const key in this.attendants) {
      for (const attend of this.attendants[key]) {
        const old = this._students[attend.full_name + '_' + attend.date]
        attend.homework = old._homework
        attend.attendance = old._attendance
      }
    }
    this.toggle = false
  }

  _getSundayDates(startingDate, duration) {
    const startingSundayMsecs = new Date(startingDate).getTime()
    const sundayDates = []
    for (let i = 0; i < duration; i++) {
      const sundayDate = new Date(startingSundayMsecs + MSECS_PER_WEEK * i)
      sundayDates.push(sundayDate)
    }
    return sundayDates
  }
}

const componentName = 'hyfAttendance'

angular.module(timelineModule)
  .component(componentName, {
    template,
    bindings: {
      selectedModule: '<'
    },
    controller: AttendanceCardController
  })

export default componentName
