import angular from 'angular';

import timelineModule from '../timeline.module';
import backendService from '../../services/backendService';
// import toastService from '../services/toastService';
import template from './attendance2.component.html';
import './attendance.scss';


class AttendanceCardController {

    static get $inject() {
        return ['me', backendService];
    }

    constructor(me, backendService) {
        this.backendService = backendService;
        this.me = me;
        this.attendances = {
            Malek: [{ full_name: "malek kanaan", date: "2017-04-9", user_id: 12, attendance: 1, homework: 1 },
            { full_name: "malek", date: "2017-04-16", user_id: 12, attendance: 1, homework: 1 },
            { full_name: "malek", date: "2017-04-23", user_id: 12, attendance: 0, homework: 0 }],
            Hasan: [{ full_name: "hasan", date: "2017-04-9", user_id: 12, attendance: 0, homework: 0 },
            { full_name: "hasan", date: "2017-04-16", user_id: 12, attendance: 0, homework: 0 },
            { full_name: "hasan", date: "2017-04-23", user_id: 12, attendance: 0, homework: 0 }],
            jack: [{ full_name: "jack", date: "2017-04-9", user_id: 12, attendance: 1, homework: 0 },
            { full_name: "jack", date: "2017-04-16", user_id: 12, attendance: 1, homework: 0 },
            { full_name: "jack", date: "2017-04-23", user_id: 12, attendance: 1, homework: 0 }],
            ahmed: [{ full_name: "ahmed", date: "2017-04-9", user_id: 12, attendance: 1, homework: 1 },
            { full_name: "ahmed", date: "2017-04-16", user_id: 12, attendance: 1, homework: 1 },
            { full_name: "ahmed", date: "2017-04-23", user_id: 12, attendance: 1, homework: 1 }],
            jim: [{ full_name: "jim", date: "2017-04-9", user_id: 12, attendance: 0, homework: 0 },
            { full_name: "jim", date: "2017-04-16", user_id: 12, attendance: 0, homework: 0 },
            { full_name: "jim", date: "2017-04-23", user_id: 12, attendance: 0, homework: 0 }],
            Sam: [{ full_name: "Sam", date: "2017-04-9", user_id: 12, attendance: 1, homework: 0 },
            { full_name: "Sam", date: "2017-04-16", user_id: 12, attendance: 1, homework: 0 },
            { full_name: "Sam", date: "2017-04-23", user_id: 12, attendance: 1, homework: 0 }]
        };
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
            console.log(this.futureModule)
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