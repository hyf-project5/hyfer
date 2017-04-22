import angular from 'angular';

import timelineModule from './timeline.module';
import timelineComponent from './timeline/timeline.component';
import backendService from '../services/backendService';
import './timelineSlider/timelineSlider.component';
import './classBlock/classBlock.component';
import './classBlock/classBlockItem.component';
import './readme/readme.component';
import './timelineIndicator/timelineIndicator.component';
import './readme/readme.component';
import './timelineRow/timelineRow.component';
import './runningModule/runningModule.component';
import '../footer/footer.component';
import './attendance/attendance.component';

routing.$inject = ['$stateProvider'];

function routing($stateProvider) {

    $stateProvider
        .state('timeline', {
            url: '/timeline',
            component: timelineComponent,
            resolve: {
                timeline: timelineResolver
            }
        });
}

timelineResolver.$inject = [backendService];

function timelineResolver(backendService) {
    return backendService.getTimeline();
}

angular.module(timelineModule)
    .config(routing);