import angular from 'angular';

import timelineModule from '../timeline.module';
import backendService from '../../services/backendService';
// import toastService from '../services/toastService';
import template from './attendance.component.html';
import './attendance.scss';


class AttendanceCardController {

    static get $inject() {
        return ['me', backendService];
    }

    constructor(me, backendService) {
        this.backendService = backendService;
        this.me = me;
        this.attendances = {
            Malek: [{ username: "malek kanaan", date: "2017-04-9", user_id: 12, attendance: 1, homework: 1 },
            { username: "malek", date: "2017-04-16", user_id: 12, attendance: 1, homework: 1 },
            { username: "malek", date: "2017-04-23", user_id: 12, attendance: 0, homework: 0 }],
            Hasan: [{ username: "hasan", date: "2017-04-9", user_id: 12, attendance: 0, homework: 0 },
            { username: "hasan", date: "2017-04-16", user_id: 12, attendance: 0, homework: 0 },
            { username: "hasan", date: "2017-04-23", user_id: 12, attendance: 0, homework: 0 }],
            jack: [{ username: "jack", date: "2017-04-9", user_id: 12, attendance: 1, homework: 0 },
            { username: "jack", date: "2017-04-16", user_id: 12, attendance: 1, homework: 0 },
            { username: "jack", date: "2017-04-23", user_id: 12, attendance: 1, homework: 0 }],
            ahmed: [{ username: "ahmed", date: "2017-04-9", user_id: 12, attendance: 1, homework: 1 },
            { username: "ahmed", date: "2017-04-16", user_id: 12, attendance: 1, homework: 1 },
            { username: "ahmed", date: "2017-04-23", user_id: 12, attendance: 1, homework: 1 }],
            jim: [{ username: "jim", date: "2017-04-9", user_id: 12, attendance: 0, homework: 0 },
            { username: "jim", date: "2017-04-16", user_id: 12, attendance: 0, homework: 0 },
            { username: "jim", date: "2017-04-23", user_id: 12, attendance: 0, homework: 0 }],
            Sam: [{ username: "Sam", date: "2017-04-9", user_id: 12, attendance: 1, homework: 0 },
            { username: "Sam", date: "2017-04-16", user_id: 12, attendance: 1, homework: 0 },
            { username: "Sam", date: "2017-04-23", user_id: 12, attendance: 1, homework: 0 }]
        };
    }


    $onChanges(changes) {
        if (!changes.selectedModule) {
            return;
        }
        this.selectedModule = changes.selectedModule.currentValue;
        console.log(this.selectedModule)
        this.getHistory(this.selectedModule);
    }


    computedMilliseconds(date) {
        const getDate = new Date(date);
        const milliseconds = getDate.getTime();
        return milliseconds;
    }


    getHistory(module) {
        this.moduleSundays = this.getSundays(module.starting_date, module.duration);
        this.historyobj = {
            classname: module.group_name,
            rmName: module.module_name
        };
        this.backendService.getHistory(module.running_module_id, this.moduleSundays)
            .then(res => {
                console.log(res.data);
                if (!res.data) {
                    this.attendants = this.attendances;
                    this.dummyData = true;
                } else {
                    this.attendants = res.data;
                    this.dummyData = false;
                }
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

    changeInStudentsHistory() {
        if (this.dummyData) return;
        this.toggleCancel = true;
        this.toggleSave = true;
    }

    saveHistory() {
        this.backendService.saveHistory(this.attendants)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    cancelChanges() {
        // this.$state.reload();
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