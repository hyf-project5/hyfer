import angular from 'angular';

import timelineModule from './timeline.module';
import './timelineIndicator.component';
import backendService from '../services/backendService';
import toastService from '../services/toastService';
import addAndUpdateRunningModuleModalCtrl from '../modals/runningModules/addAndUpdateRunningModuleModalCtrl';
import mainTimelineTemplate from './mainTimeline.component.html';
import editRunningModuleTemplate from '../modals/runningModules/editRunningModuleModal.html';
import githubIcon from '../../assets/images/github.svg';

const days = 1000 * 60 * 60 * 24;
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class MainTimelineController {

    static get $inject() {
        return ['$sce', '$mdDialog', '$state', 'me', backendService, toastService];
    }

    constructor($sce, $mdDialog, $state, me, backendService, toastService) {
        this.$sce = $sce;
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.backendService = backendService;
        this.me = me;
        this.toastService = toastService;
        this.githubIcon = githubIcon;
    }

    $onInit() {
        const current_date = new Date();
        this.currentDate = dayNames[current_date.getDay()] + ", " + current_date.getDate() + " " + monthNames[current_date.getMonth()] + " " + current_date.getFullYear();
        this.todayPosition = Math.round(this.computedMilliseconds(current_date) / days);
        this.indicatorHeight = (this.classes.length * 60) + 20;
        this.readmeHeaderTop = this.indicatorHeight + 55;
        const zeroPoint = Math.round(this.computedMilliseconds(this.getClosestSundayAndRidOfTime(this.timeline[this.classes[0]][0].starting_date)) / days);
        this.classes.forEach(entry => {
            let firsModuleStartDateInThisGroup = Math.round(this.computedMilliseconds(this.getClosestSundayAndRidOfTime(this.timeline[entry][0].starting_date)) / days);
            let leftPosition = firsModuleStartDateInThisGroup - zeroPoint;
            let classBgColor = this.randomColor();
            this.timeline[entry].forEach(runningModule => {
                runningModule.classBgColor = classBgColor;
                runningModule.blockWidth = (runningModule.duration * 7 * 9) - 6;
                runningModule.leftPosition = (leftPosition * 9) + 125;
                // runningModule.blockClass = 'block-no-' + runningModule.duration;
                // runningModule.startingWeekClass = 'block-week-' + Math.round(position / 7);
                runningModule.bgColor = this.randomColor();
                runningModule.startingDate = this.getInterfaceDate(firsModuleStartDateInThisGroup);
                let endDate = (firsModuleStartDateInThisGroup) + (runningModule.duration * 7);
                runningModule.endingDate = this.getInterfaceDate(endDate);
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
        this.backendService.getReadme(this.timeline[this.classes[0]][0].git_repo)
            .then(res => this.readmeFile = this.$sce.trustAsHtml(res))
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
        return dayNames[date.getDay()] + ", " + date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();

    }

    showReadme(module) {
        if (!module.git_repo) {
            return this.toastService.displayToast(true, 'This module has no repository available.')
        }
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

    editRunningModule(ev, selectedRunningModule) {
        this.$mdDialog.show({
            locals: {
                className: selectedRunningModule.group_name,
                selectedRunningModule
            },
            controller: addAndUpdateRunningModuleModalCtrl,
            controllerAs: '$ctrl',
            template: editRunningModuleTemplate,
            targetEvent: ev,
            clickOutsideToClose: true
        })
    }

    splitRunningModule(module) {
        this.backendService.splitRunningModule(module.id, module.position)
            .then(data => {
                this.$state.reload();
            })
            .catch(err => console.log(err))
    }

}

const componentName = 'hyfMainTimeline';

angular.module(timelineModule)
    .component('hyfMainTimeline', {
        template: mainTimelineTemplate,
        bindings: {
            timeline: '<',
            classes: '<'
        },
        controller: MainTimelineController
    });

export default componentName;