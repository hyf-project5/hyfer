import angular from 'angular';
import timelineModule from './timeline.module';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class TimeLineService {

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
}

const serviceName = 'timeLineService';

angular.module(timelineModule)
    .service(serviceName, TimeLineService);

export default serviceName;