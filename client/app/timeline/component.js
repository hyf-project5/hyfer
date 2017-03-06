(function () {
    'use strict';

    angular
        .module('hyferApp')
        .component('hyfTimeline', {
            templateUrl: 'app/timeline/view.html',
            controller: hyfTimelineController
        });

    hyfTimelineController.inject = ['backendService', '$sce'];

    function hyfTimelineController(backendService, $sce) {
        var ctrl = this;
        var days = 1000 * 60 * 60 * 24;
        var current_date = new Date();
        const month_names = new Array();
        month_names[month_names.length] = "January";
        month_names[month_names.length] = "February";
        month_names[month_names.length] = "March";
        month_names[month_names.length] = "April";
        month_names[month_names.length] = "May";
        month_names[month_names.length] = "June";
        month_names[month_names.length] = "July";
        month_names[month_names.length] = "August";
        month_names[month_names.length] = "September";
        month_names[month_names.length] = "October";
        month_names[month_names.length] = "November";
        month_names[month_names.length] = "December";
        const day_names = new Array();
        day_names[day_names.length] = "Sunday";
        day_names[day_names.length] = "Monday";
        day_names[day_names.length] = "Tuesday";
        day_names[day_names.length] = "Wednesday";
        day_names[day_names.length] = "Thursday";
        day_names[day_names.length] = "Friday";
        day_names[day_names.length] = "Saturday";
        ctrl.currentDate = day_names[current_date.getDay()] + ", " + current_date.getDate() + " " + month_names[current_date.getMonth()] + " " + current_date.getFullYear();
        ctrl.todayPosition = Math.round(computedMilliseconds(current_date) / days);
        backendService.getTimeline()
            .then(res => {
                ctrl.timeline = res;
                ctrl.classes = Object.keys(ctrl.timeline).sort();
                var zeroPoint = Math.round(computedMilliseconds(getClosestSundayAndRidOfTime(ctrl.timeline[ctrl.classes[0]][0].starting_date)) / days);
                ctrl.indicatorPosition = (ctrl.todayPosition - zeroPoint) * 15;
                ctrl.indicatorDatePosition = ctrl.indicatorPosition + 5;
                $(document).ready(function () {
                    $("#main-timeline").scrollLeft(ctrl.indicatorPosition - 350);
                });
                ctrl.classes.forEach(function (entry) {
                    var firsModuleStartDateInThisGroup = Math.round(computedMilliseconds(getClosestSundayAndRidOfTime(ctrl.timeline[entry][0].starting_date)) / days);
                    var position = firsModuleStartDateInThisGroup - zeroPoint + 10;
                    var classBgColor = randomColor();
                    ctrl.timeline[entry].forEach(function (runningModule) {
                        runningModule.classBgColor = classBgColor;
                        runningModule.width = (runningModule.duration * 7 * 15) - 6;
                        runningModule.position = position * 15;
                        runningModule.bgColor = randomColor();
                        runningModule.startingDate = getInterfaceDate(firsModuleStartDateInThisGroup);
                        var endDate = (firsModuleStartDateInThisGroup) + (runningModule.duration * 7);
                        runningModule.endingDate = getInterfaceDate(endDate);
                        firsModuleStartDateInThisGroup = endDate;
                    });
                });




                // for development puposes hard-coded(concatenated) the git_url&git_repo till fixing(until the real data) 
                let gitUrl = ctrl.timeline[ctrl.classes[0]][0].git_url + ctrl.timeline[ctrl.classes[0]][0].git_repo;
                ctrl.readme = {
                    moduleName: ctrl.timeline[ctrl.classes[0]][0].module_name,
                    gitUrl: gitUrl
                }
                ctrl.maxLength = 0;
                for (let key in ctrl.timeline) {
                    ctrl.maxLength = Math.max(ctrl.maxLength, ctrl.timeline[key].length, 10);
                }
                backendService.getReadme(ctrl.timeline[ctrl.classes[0]][0].git_repo)
                    .then(res => ctrl.readmeFile = $sce.trustAsHtml(res))
                    .catch(err => console.log(err));
            });

        ctrl.showReadme = showReadme;

        function showReadme(module) {
            backendService.getReadme(module.git_repo)
                .then(res => {
                    ctrl.readmeFile = $sce.trustAsHtml(res);
                    ctrl.readme = {
                        moduleName: module.module_name,
                        gitUrl: module.git_url + module.git_repo
                    }
                })
                .catch(err => console.log(err))
        }

        ctrl.computedMilliseconds = computedMilliseconds;


        function computedMilliseconds(date) {
            var getDate = new Date(date);
            var milliseconds = getDate.getTime();
            return milliseconds;
        }
        function randomColor() {
            var themeColor = ['#5cbae6', '#b6d957', '#fac364', '#8cd3ff', '#d998cb', '#f2d249', '#93b9c6', '#ccc5a8', '#52bacc', '#dbdb46', '#98aafb'];
            var xColor = Math.floor(Math.random() * themeColor.length);
            return themeColor[xColor];
        }
        function getClosestSundayAndRidOfTime(date) {
            var d = new Date(date);
            d.setHours(0, 0, 0, 0);
            var t = new Date(d);
            t.setDate(t.getDate() - t.getDay());
            return t;
        }
        function getInterfaceDate(value) {
            var time = value * days;
            var date = new Date(time);
            return day_names[date.getDay()] + ", " + date.getDate() + " " + month_names[date.getMonth()] + " " + date.getFullYear();

        }
    }
})();