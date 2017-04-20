import angular from 'angular';

import timelineModule from '../timeline.module';
import timelineService from '../timeline.service';
import backendService from '../../services/backendService';
import toastService from '../../services/toastService';
import template from './timelineSlider.component.html';
import githubIcon from '../../../assets/images/github.svg';
import './timelineSlider.scss';

const RUNNING_MODULE_HEIGHT = 55;
const DAYS_PER_WEEK = 7;
const MSECS_PER_DAY = 1000 * 60 * 60 * 24;

class TimelineSliderController {

    static get $inject() {
        return ['$state', 'me', timelineService, backendService, toastService];
    }

    constructor($state, me, timelineService, backendService, toastService) {
        this.$state = $state;
        this.me = me;
        this.timelineService = timelineService;
        this.backendService = backendService;
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

        const firstSundayDate = this.timelineService.getDateOfPastSunday(firstStartingDate);
        const zeroPoint = firstSundayDate.getTime();

        this.classNames.forEach(className => {
            const runningModules = this.timeline[className];
            const firstRunningModule = runningModules[0];
            const startDate = new Date(firstRunningModule.starting_date);
            let startDateInMsecs = this.timelineService.getDateOfPastSunday(startDate).getTime();
            const leftPosition = (startDateInMsecs - zeroPoint) / MSECS_PER_DAY * 9 + 125;

            this.timeline[className].forEach(runningModule => {
                const durationInMsecs = runningModule.duration * DAYS_PER_WEEK * MSECS_PER_DAY;
                const extras = {
                    blockWidth: (runningModule.duration * DAYS_PER_WEEK * 9) - 6,
                    leftPosition,
                    startingDate: this.timelineService.getFormattedDateString(new Date(startDateInMsecs)),
                    endingDate: this.timelineService.getFormattedDateString(new Date(startDateInMsecs + durationInMsecs))
                };
                Object.assign(runningModule, extras);
                startDateInMsecs += durationInMsecs;
            });
        });
    }

    // showReadme(module) {

    //     this.selectedModule = module;
    // }

}

const componentName = 'hyfTimelineSlider';

angular.module(timelineModule)
    .component(componentName, {
        template: template,
        bindings: {
            timeline: '<',
            onModuleClick: '&'
        },
        controller: TimelineSliderController
    });

export default componentName;