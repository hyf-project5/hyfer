(function() {
    'use strict';

    angular
        .module('hyferApp')
        .service('backendService', backendService)

    /** @ngInject */
    backendService.$inject = ['$http'];

    function backendService($http) {
        return {
            getModules: getModules
        }

        function getModules() {
            return $http.get('/modules')
                .then(res => res.data);
        }
    }

}());