import angular from 'angular';

import timelineModule from '../timeline.module';
import backendService from '../../services/backendService';
// import toastService from '../services/toastService';
import template from './attendance.component.html';
import './attendance.scss';


class AttendanceCardController {

    static get $inject() {
        return ['$state', 'me', backendService];
    }

    constructor($state, me, backendService) {
        this.backendService = backendService;
        this.me = me;
        this.$state = $state;
    }


    $onChanges(changes) {
        if (!changes.selectedModule) {
            return;
        }
        this.selectedModule = changes.selectedModule.currentValue;
        const now = new Date().toJSON().split('T')[0];
        const selectedModuleDate = new Date(this.selectedModule.startingDate).toJSON().split('T')[0];
        if (selectedModuleDate > now) {
            this.futureModule = true;
<<<<<<< HEAD
            console.log(this.futureModule)
=======
>>>>>>> hasan
        } else {
            this.futureModule = false;
        }

        this.getHistory(this.selectedModule);
    }


    computedMilliseconds(date) {
        const getDate = new Date(date);
        const milliseconds = getDate.getTime();
        return milliseconds;
    }


    getHistory(module) {
        this.moduleSundays = this.getSundays(module.startingDate, module.duration);
        this.historyobj = {
            classname: module.group_name,
            rmName: module.module_name
        };
        this.backendService.getHistory(module.running_module_id, module.id, this.moduleSundays)
            .then(res => {
                const keys = Object.keys(res.data).sort()
                this._students = [];
                for (let student of keys) {
                    for (let val of res.data[student]) {
                        let obj = {
                            _full_name: val.full_name,
                            _date: val.date,
                            _attendance: val.attendance,
                            _homework: val.homework
                        }
                        this._students.push(obj)
                    }
                }
                this.attendants = res.data;
            })
            .catch(err => console.log(err));
    }

    getSundays(moduleStartingDate, duration) {
        const week = 1000 * 60 * 60 * 24 * 7;
        const sunday = new Date(moduleStartingDate);
        const sunInMilliseconds = sunday.getTime();
        const sundays = [];
        for (let i = 0; i < duration; i++) {
            const getNextSundayDate = new Date(sunInMilliseconds + week * i).toJSON();
            sundays.push(getNextSundayDate.split("T")[0]);
        }
        return sundays;
    }

    changeInStudentsHistory(studentChanged) {
        let doesUserChanged = [];
        for (let key in this.attendants) {
            for (let attend of this.attendants[key]) {
                doesUserChanged.push(this._students.some(_student => _student._homework !== attend.homework || _student._attendance !== attend.attendance))
            }
        }
        if (doesUserChanged.some(check => check === true)) {
            this.toggle = true;
        } else {
            this.toggle = false;
        }
    }

    saveHistory() {
        this.backendService.saveHistory(this.attendants)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    cancelChanges() {
        console.log(this.attendants)
        for (let key in this.attendants) {
            for (let attend of this.attendants[key]) {
                this._students.forEach(_student =>{
                    if (_student._full_name === attend.full_name && _student._date === attend.date) {
                        attend.homework = _student._homework;
                        attend.attendance = _student._attendance;
                    }
                })
            }
        }
        this.toggle = false;
    }

}

const componentName = 'hyfAttendance';

angular.module(timelineModule)
    .component(componentName, {
        template,
        bindings: {
            selectedModule: "<"
        },
        controller: AttendanceCardController
    });

export default componentName;