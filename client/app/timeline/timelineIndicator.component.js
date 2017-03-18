import angular from 'angular';

import timelineModule from './timeline.module';

const template = require('./timelineIndicator.component.html');

const days = 1000 * 60 * 60 * 24;
const month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const day_names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

class TimelineIndicatorController {

    static get $inject() {
        return ['backendService'];
    }

    constructor(backendService) {
        this.backendService = backendService;
    }

    computedMilliseconds(date) {
        let getDate = new Date(date);
        let milliseconds = getDate.getTime();
        return milliseconds;
    }

    getClosestSundayAndRidOfTime(date) {
        let d = new Date(date);
        d.setHours(0, 0, 0, 0);
        let t = new Date(d);
        t.setDate(t.getDate() - t.getDay());
        return t;
    }

    $postLink() {
        const current_date = new Date();
        // this.backendService.getTimeline()
        //     .then(data => {
        this.currentDate = day_names[current_date.getDay()] + ", " + current_date.getDate() + " " + month_names[current_date.getMonth()] + " " + current_date.getFullYear();
        this.todayPosition = Math.round(this.computedMilliseconds(current_date) / days);
        // this.timeline = data;
        // this.classes = Object.keys(this.timeline);
        this.indicatorHeight = (this.classes.length * 60) + 20;
        const zeroPoint = Math.round(this.computedMilliseconds(this.getClosestSundayAndRidOfTime(this.timeline[this.classes[0]][0].starting_date)) / days);
        this.indicatorPosition = ((this.todayPosition - zeroPoint) * 9) + 125;
        let scrollToLeft = this.indicatorPosition - 350;
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
            timeline: '<',
            classes: '<'
        },
        controller: TimelineIndicatorController
    });

export default componentName;