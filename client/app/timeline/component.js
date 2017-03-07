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
        let ctrl = this;
        const days = 1000 * 60 * 60 * 24;
        const month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day_names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const current_date = new Date();
        ctrl.currentDate = day_names[current_date.getDay()] + ", " + current_date.getDate() + " " + month_names[current_date.getMonth()] + " " + current_date.getFullYear();
        ctrl.todayPosition = Math.round(computedMilliseconds(current_date) / days);
        // Math.round(computedMilliseconds(current_date) / days);
        backendService.getTimeline()
            .then(res => {
                ctrl.timeline = res;
                ctrl.classes = Object.keys(ctrl.timeline).sort();
                ctrl.indicatorHeight = (ctrl.classes.length * 60) + 20;
                ctrl.readmeHeaderTop = ctrl.indicatorHeight + 55;
                const zeroPoint = Math.round(computedMilliseconds(getClosestSundayAndRidOfTime(ctrl.timeline[ctrl.classes[0]][0].starting_date)) / days);
                ctrl.indicatorPosition = ((ctrl.todayPosition - zeroPoint) * 15) + 150;
                ctrl.indicatorDatePosition = ctrl.indicatorPosition + 5;
                let scrollToLeft = ctrl.indicatorPosition - 350;
                scrollTimelineToToday(scrollToLeft);
                ctrl.classes.forEach(function (entry) {
                    let firsModuleStartDateInThisGroup = Math.round(computedMilliseconds(getClosestSundayAndRidOfTime(ctrl.timeline[entry][0].starting_date)) / days);
                    let position = firsModuleStartDateInThisGroup - zeroPoint + 10;
                    let classBgColor = randomColor();
                    ctrl.timeline[entry].forEach(function (runningModule) {
                        runningModule.classBgColor = classBgColor;
                        runningModule.blockClass = 'block-no-' + runningModule.duration;
                        runningModule.width = (runningModule.duration * 7 * 15) - 6;
                        runningModule.position = position * 15;
                        runningModule.bgColor = randomColor();
                        runningModule.startingDate = getInterfaceDate(firsModuleStartDateInThisGroup);
                        let endDate = (firsModuleStartDateInThisGroup) + (runningModule.duration * 7);
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
            let getDate = new Date(date);
            let milliseconds = getDate.getTime();
            return milliseconds;
        }
        function randomColor() {
            let themeColor = ['#5cbae6', '#b6d957', '#fac364', '#8cd3ff', '#d998cb', '#f2d249', '#93b9c6', '#ccc5a8', '#52bacc', '#dbdb46', '#98aafb'];
            let xColor = Math.floor(Math.random() * themeColor.length);
            return themeColor[xColor];
        }
        function getClosestSundayAndRidOfTime(date) {
            let d = new Date(date);
            d.setHours(0, 0, 0, 0);
            let t = new Date(d);
            t.setDate(t.getDate() - t.getDay());
            return t;
        }
        function getInterfaceDate(value) {
            let time = value * days;
            let date = new Date(time);
            return day_names[date.getDay()] + ", " + date.getDate() + " " + month_names[date.getMonth()] + " " + date.getFullYear();

        }
        function scrollTimelineToToday(scrollToLeft) {
            setTimeout(
                function () {
                    document.getElementById("main-timeline").scrollLeft = scrollToLeft;
                }, 50);
        }
    }
})();