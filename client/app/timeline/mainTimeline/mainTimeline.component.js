import angular from 'angular';

import timelineModule from '../timeline.module';
import '../timelineIndicator/timelineIndicator.component';
import '../readme/readme.component';
import '../runningModule/runningModule.component';

import backendService from '../../services/backendService';
import toastService from '../../services/toastService';
import mainTimelineTemplate from './mainTimeline.component.html';
import githubIcon from '../../../assets/images/github.svg';

const RUNNING_MODULE_HEIGHT = 55;
const DAYS_IN_MSECS = 1000 * 60 * 60 * 24;
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class MainTimelineController {

    static get $inject() {
        return ['$state', 'me', backendService, toastService];
    }

    constructor($state, me, backendService, toastService) {
        this.$state = $state;
        this.backendService = backendService;
        this.me = me;
        this.toastService = toastService;
        this.githubIcon = githubIcon;
    }

    $onInit() {
        this.classNames = Object.keys(this.timeline);
        this.selectedModule = this.timeline[this.classNames[0]][0];

        this.indicatorHeight = (this.classNames.length * 60) + 20;
        this.readmeHeaderTop = this.indicatorHeight + RUNNING_MODULE_HEIGHT;

        const firstClassName = this.classNames[0];
        const firstClassRunningModules = this.timeline[firstClassName];
        const firstRunningModule = firstClassRunningModules[0];
        const firstStartingDate = new Date(firstRunningModule.starting_date);

        const zeroPoint = Math.round(this.getDateOfPastSunday(firstStartingDate).getTime() / DAYS_IN_MSECS);

        this.classNames.forEach(className => {
            const runningModules = this.timeline[className];
            const firstRunningModule = runningModules[0];
            let startDate = Math.round(this.getDateOfPastSunday(firstRunningModule.starting_date).getTime() / DAYS_IN_MSECS);
            const leftPosition = (startDate - zeroPoint) * 9 + 125;

            this.timeline[className].forEach(runningModule => {
                const endDate = startDate + runningModule.duration * 7;
                const extras = {
                    blockWidth: (runningModule.duration * 7 * 9) - 6,
                    leftPosition,
                    startingDate: this.getFormattedDateString(startDate),
                    endingDate: this.getFormattedDateString(endDate)
                };
                Object.assign(runningModule, extras);
                startDate = endDate;
            });

        });
    }

    getDateOfPastSunday(date) {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0);
        const daysPastSunday = newDate.getDay();
        const dayOfMonth = newDate.getDate();
        newDate.setDate(dayOfMonth - daysPastSunday);
        return newDate;
    }

    getFormattedDateString(value) {
        const date = new Date(value * DAYS_IN_MSECS);
        return `${DAY_NAMES[date.getDay()]}, ${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
    }

    showReadme(module) {
        this.selectedModule = module;
    }

}

const componentName = 'hyfMainTimeline';

angular.module(timelineModule)
    .component('hyfMainTimeline', {
        template: mainTimelineTemplate,
        bindings: {
            timeline: '<'
        },
        controller: MainTimelineController
    });

export default componentName;