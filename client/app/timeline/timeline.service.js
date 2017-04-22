import angular from 'angular';

import timelineModule from './timeline.module';
import backendService from '../services/backendService';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class TimeLineService {

    static get $inject() {
        return [backendService];
    }

    constructor(backendService) {
        this.backendService = backendService;
        this._notificationCallback = null;
    }

    getDateOfPastSunday(date) {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0);
        const daysPastSunday = newDate.getDay();
        const dayOfMonth = newDate.getDate();
        newDate.setDate(dayOfMonth - daysPastSunday);
        return newDate;
    }

    getFormattedDateString(date) {
        return `${DAY_NAMES[date.getDay()]}, ${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
    }

    setCallback(notificationCallback) {
        this._notificationCallback = notificationCallback;
    }

    notifyChanged() {
        if (this._notificationCallback) {
            this.backendService.getTimeline()
                .then(timeline => this._notificationCallback(timeline))
                .catch(err => console.log(err));
        }
    }
}

const serviceName = 'timeLineService';

angular.module(timelineModule)
    .service(serviceName, TimeLineService);

export default serviceName;