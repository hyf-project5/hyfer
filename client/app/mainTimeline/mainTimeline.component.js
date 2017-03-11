(function() {
    'use strict';
    const days = 1000 * 60 * 60 * 24;
    const month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day_names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    class MainTimelineController {

        static get $inject() {
            return ['backendService', '$sce', 'me', '$mdDialog'];
        }
        constructor(backendService, $sce, me, $mdDialog) {
            this.$mdDialog = $mdDialog;
            this.backendService = backendService;
            this.$sce = $sce;
            this.me = me;
            let ctrl = this;
            const current_date = new Date();
            backendService.getTimeline()
                .then(data => {
                    this.currentDate = day_names[current_date.getDay()] + ", " + current_date.getDate() + " " + month_names[current_date.getMonth()] + " " + current_date.getFullYear();
                    this.todayPosition = Math.round(this.computedMilliseconds(current_date) / days);
                    this.timeline = data;
                    this.classes = Object.keys(this.timeline);
                    this.indicatorHeight = (this.classes.length * 60) + 20;
                    this.readmeHeaderTop = this.indicatorHeight + 55;
                    const zeroPoint = Math.round(this.computedMilliseconds(this.getClosestSundayAndRidOfTime(this.timeline[this.classes[0]][0].starting_date)) / days);
                    this.classes.forEach(function(entry) {
                        let firsModuleStartDateInThisGroup = Math.round(ctrl.computedMilliseconds(ctrl.getClosestSundayAndRidOfTime(ctrl.timeline[entry][0].starting_date)) / days);
                        let leftPosition = firsModuleStartDateInThisGroup - zeroPoint;
                        let classBgColor = ctrl.randomColor();
                        ctrl.timeline[entry].forEach(function(runningModule) {
                            runningModule.classBgColor = classBgColor;
                            runningModule.blockWidth = (runningModule.duration * 7 * 9) - 6;
                            runningModule.leftPosition = (leftPosition * 9) + 125;
                            // runningModule.blockClass = 'block-no-' + runningModule.duration;
                            // runningModule.startingWeekClass = 'block-week-' + Math.round(position / 7);
                            runningModule.bgColor = ctrl.randomColor();
                            runningModule.startingDate = ctrl.getInterfaceDate(firsModuleStartDateInThisGroup);
                            let endDate = (firsModuleStartDateInThisGroup) + (runningModule.duration * 7);
                            runningModule.endingDate = ctrl.getInterfaceDate(endDate);
                            firsModuleStartDateInThisGroup = endDate;
                        });
                    });

                    let gitUrl = this.timeline[this.classes[0]][0].git_url + this.timeline[this.classes[0]][0].git_repo;
                    this.readme = {
                        moduleName: this.timeline[this.classes[0]][0].module_name,
                        gitUrl: gitUrl
                    }
                    this.maxLength = 0;
                    for (let key in this.timeline) {
                        this.maxLength = Math.max(this.maxLength, this.timeline[key].length, 10);
                    }
                    backendService.getReadme(this.timeline[this.classes[0]][0].git_repo)
                        .then(res => this.readmeFile = $sce.trustAsHtml(res))
                        .catch(err => console.log(err));
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

        showReadme(module) {
            this.backendService.getReadme(module.git_repo)
                .then(res => {
                    this.readmeFile = this.$sce.trustAsHtml(res);
                    this.readme = {
                        moduleName: module.module_name,
                        gitUrl: module.git_url + module.git_repo
                    }
                })
                .catch(err => console.log(err))
        }

        isTeacher() {
            if (this.me.role == 'teacher') {
                return true;
            }
        }

        editRunningModule(ev, selectedRunningModule, index) {
            this.$mdDialog.show({
                locals: {
                    className: selectedRunningModule.group_name,
                    selectedRunningModule,
                    index
                },
                controller: 'addAndUpdateRunningModuleModalCtrl',
                controllerAs: '$ctrl',
                templateUrl: 'client/app/mainTimeline/editRunningModuleModal.html',
                targetEvent: ev,
                clickOutsideToClose: true
            })
        }
    }

    angular.module('hyferApp')
        .component('hyfMainTimeline', {
            templateUrl: './app/mainTimeline/mainTimeline.component.html',
            controller: MainTimelineController
        });
})();