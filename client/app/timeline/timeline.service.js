import angular from 'angular';
import timelineModule from './timeline.module';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class TimeLineService {

    constructor() {
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

   setTimelineChangedCallback(notificationCallback) {
        this._notificationCallback = notificationCallback;
    }

    notifyTimelineChanged() {
        if (this._notificationCallback) {
            this._notificationCallback();
        }
    }
}

const serviceName = 'timeLineService';

angular.module(timelineModule)
    .service(serviceName, TimeLineService);

export default serviceName;