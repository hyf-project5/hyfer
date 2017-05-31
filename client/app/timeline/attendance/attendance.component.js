import angular from 'angular'

import timelineModule from '../timeline.module'
import backendService from '../../services/backendService'
import toastService from '../../services/toastService'
import template from './attendance.component.html'
import './attendance.scss'

const MSECS_PER_WEEK = 1000 * 60 * 60 * 24 * 7

class AttendanceCardController {
  static get $inject() {
      return ['$filter', 'me', backendService, toastService]
  }

    constructor($filter, me, backendService, toastService) {
    this.backendService = backendService
    this.me = me
    this.toastService = toastService
        this.stack = []
        this.$filter = $filter
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
    // Make a copy with the corresponding date to mysql to save
      let sundays = this.moduleSundays.slice(0)
    sundays = sundays.map(date => {
        return this.$filter('date')(date, 'yyyy/MM/dd')
    })
    this.backendService.getHistory(module.running_module_id, module.id, sundays)
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

  changeInStudentsHistory(student, whichToUndo) {
      this.stack.push(student)
    this.stack.push(whichToUndo)
    this.toggle = true
  }

  saveHistory() {
    this.backendService.saveHistory(this.attendants)
        .then(() => {
            this.toggle = false
            this.stack = []
            this.toastService.displayToast(true, 'Your changes have been saved')
        })
      .catch(err => console.log(err))
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

  undo() {
      const whichToUndo = this.stack.pop()
      const last = this.stack.pop()
    const old = this._students[last.full_name + '_' + last.date]
    this.attendants[last.full_name].forEach(student => {
      if (student.date === last.date) {
        if (student.homework !== old._homework && whichToUndo === 'homework'){
            student.homework = old._homework
        }else if(student.attendance !== old._attendance && whichToUndo === 'attendance'){
            student.attendance = old._attendance
        }
      }
    });
    if (this.stack.length < 1) {
      this.toggle = false
    }
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
