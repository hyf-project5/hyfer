(function() {
    'use strict';
    const days = 1000 * 60 * 60 * 24;
    const month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day_names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    class MainTimelineController {

        static get $inject() {
            return ['backendService'];
        }
        constructor(backendService) {
            this.backendService = backendService;
            let ctrl = this;
            const current_date = new Date();
            backendService.getTimeline()
                .then(data => {
                    this.currentDate = day_names[current_date.getDay()] + ", " + current_date.getDate() + " " + month_names[current_date.getMonth()] + " " + current_date.getFullYear();
                    this.todayPosition = Math.round(this.computedMilliseconds(current_date) / days);
                    this.timeline = data;
                    this.classes = Object.keys(this.timeline).sort();
                    this.indicatorHeight = (this.classes.length * 60) + 20;
                    this.readmeHeaderTop = this.indicatorHeight + 55;
                    const zeroPoint = Math.round(this.computedMilliseconds(this.getClosestSundayAndRidOfTime(this.timeline[this.classes[0]][0].starting_date)) / days);
                    this.indicatorPosition = ((this.todayPosition - zeroPoint) * 15) + 150;
                    this.indicatorDatePosition = this.indicatorPosition + 5;
                    let scrollToLeft = this.indicatorPosition - 350;
                    this.scrollTimelineToToday(scrollToLeft);


                    let that = this;
                    this.classes.forEach(function(entry) {
                        let firsModuleStartDateInThisGroup = Math.round(ctrl.computedMilliseconds(ctrl.getClosestSundayAndRidOfTime(ctrl.timeline[entry][0].starting_date)) / days);
                        let position = firsModuleStartDateInThisGroup - zeroPoint + 10;
                        let classBgColor = ctrl.randomColor();
                        ctrl.timeline[entry].forEach(function(runningModule) {
                            runningModule.classBgColor = classBgColor;
                            runningModule.blockClass = 'block-no-' + runningModule.duration;
                            runningModule.startingWeekClass = 'block-week-' + Math.round(position / 7);
                            runningModule.position = position * 15;
                            runningModule.bgColor = ctrl.randomColor();
                            runningModule.startingDate = ctrl.getInterfaceDate(firsModuleStartDateInThisGroup);
                            let endDate = (firsModuleStartDateInThisGroup) + (runningModule.duration * 7);
                            runningModule.endingDate = ctrl.getInterfaceDate(endDate);
                            firsModuleStartDateInThisGroup = endDate;
                        });
                    });
                })
                .catch(err => console.log(err));
        }






        computedMilliseconds(date) {
            let getDate = new Date(date);
            let milliseconds = getDate.getTime();
            return milliseconds;
        }
        randomColor() {
            let themeColor = ['#5cbae6', '#b6d957', '#fac364', '#8cd3ff', '#d998cb', '#f2d249', '#93b9c6', '#ccc5a8', '#52bacc', '#dbdb46', '#98aafb'];
            let xColor = Math.floor(Math.random() * themeColor.length);
            return themeColor[xColor];
        }
        getClosestSundayAndRidOfTime(date) {
            let d = new Date(date);
            d.setHours(0, 0, 0, 0);
            let t = new Date(d);
            t.setDate(t.getDate() - t.getDay());
            return t;
        }
        getInterfaceDate(value) {
            let time = value * days;
            let date = new Date(time);
            return day_names[date.getDay()] + ", " + date.getDate() + " " + month_names[date.getMonth()] + " " + date.getFullYear();

        }
        scrollTimelineToToday(scrollToLeft) {
            setTimeout(
                function() {
                    document.getElementById("main-timeline").scrollLeft = scrollToLeft;
                }, 50);
        }






    }

    angular.module('hyferApp')
        .component('hyfMainTimeline', {
            templateUrl: './app/mainTimeline/mainTimeline.component.html',
            controller: MainTimelineController
        });
})();