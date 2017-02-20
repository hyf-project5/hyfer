(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('myApp')
        .component('modules', {
            templateUrl: 'client/app/modules/view.html',
            controller: modulesCtrl,
            bindings: {
                Binding: '=',
            }
        });

    modulesCtrl.inject = [];

    function modulesCtrl() {
        let ctrl = this;

        ctrl.modules = [{
                "module_name": "Javascript",
                "uuid": "59ae2074-9b28-4947-a974-a34181de8d41",
                "description": "next generation",
                "added_by": "Malvina Jast",
                "added_on": "2016-10-26T02:22:42.069Z",
                "module_image": "http://lorempixel.com/640/480/technics",
                "git_url": "https://github.com/hyf-project5/super-duper-5"
            },
            {
                "module_name": "HTML",
                "uuid": "50597d1a-6eea-463c-9153-a14d04170304",
                "description": "next generation",
                "added_by": "Lorena O'Connell",
                "added_on": "2016-08-10T15:26:31.477Z",
                "module_image": "http://lorempixel.com/640/480/technics",
                "git_url": "https://github.com/hyf-project5/super-duper-5"
            },
            {
                "module_name": "CSS",
                "uuid": "457fbec9-ba59-4172-af31-528df160a542",
                "description": "logistical",
                "added_by": "Neoma Grimes",
                "added_on": "2016-11-06T19:06:00.964Z",
                "module_image": "http://lorempixel.com/640/480/technics",
                "git_url": "https://github.com/hyf-project5/super-duper-5"
            }
        ]
    }
})();