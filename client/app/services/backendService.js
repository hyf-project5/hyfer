(function() {
    'use strict';

    angular
        .module('hyferApp')
        .service('backendService', backendService)

    /** @ngInject */
    backendService.$inject = ['$http', '$cookies'];

    function backendService($http, $cookies) {
        let token = $cookies.get('token').slice(1, -1);
        let config = {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
        return {
            getModules: getModules
        }


        function getModules() {
            return $http.get('/modules', config)
                .then(res => res.data);
        }

    }

}());