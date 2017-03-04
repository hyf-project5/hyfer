(function() {
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

        backendService.getTimeline()
            .then(res => {
                ctrl.timeline = res;
                ctrl.classes = Object.keys(ctrl.timeline).sort();
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
    }
})();