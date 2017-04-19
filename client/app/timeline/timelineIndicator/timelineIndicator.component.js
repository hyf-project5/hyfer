import angular from 'angular';

import timelineModule from '../timeline.module';
import template from './timelineIndicator.component.html';

const days = 1000 * 60 * 60 * 24;
const month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const day_names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class TimelineIndicatorController {

    static get $inject() {
        return ['backendService'];
    }

    constructor(backendService) {
        this.backendService = backendService;
    }

    computedMilliseconds(date) {
        const getDate = new Date(date);
        const milliseconds = getDate.getTime();
        return milliseconds;
    }

    getClosestSunday(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        const t = new Date(d);
        t.setDate(t.getDate() - t.getDay());
        return t;
    }

    $postLink() {
        const current_date = new Date();
        // this.backendService.getTimeline()
        //     .then(data => {
        this.currentDate = day_names[current_date.getDay()] + ", " + current_date.getDate() + " " + month_names[current_date.getMonth()] + " " + current_date.getFullYear();
        this.todayPosition = Math.round(this.computedMilliseconds(current_date) / days);
        const classNames = Object.keys(this.timeline);
        this.indicatorHeight = (classNames.length * 60) + 20;
        const zeroPoint = Math.round(this.computedMilliseconds(this.getClosestSunday(this.timeline[classNames[0]][0].starting_date)) / days);
        this.indicatorPosition = ((this.todayPosition - zeroPoint) * 9) + 125;
        const scrollToLeft = this.indicatorPosition - 350;
        setTimeout(() => {
            document.getElementById("main-timeline").scrollLeft = scrollToLeft;
        }, 100);

        // }).catch(err => console.log(err));
    }
}

const componentName = 'hyfTimelineIndicator';

angular.module(timelineModule)
    .component(componentName, {
        template,
        bindings: {
            timeline: '<'
        },
        controller: TimelineIndicatorController
    });

export default componentName;