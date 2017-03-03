(function() {
    'use strict';

    angular
        .module('hyferApp')
        .service('backendService', backendService)

    backendService.$inject = ['$http'];

    function backendService($http) {

        return {
            getModules: getModules
        }

        function getModules() {
            return $http.get('/api/modules', getHttpConfig())
                .then(res => res.data);
        }

    }

    function getHttpConfig() {
        let config = {};
        let token = window.localStorage.getItem('token');
        if (token) {
            config.headers = { 'Authorization': 'Bearer ' + token };
        }
        return config;
    }

}());