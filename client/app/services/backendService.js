(function() {
    'use strict';



    class backendService {
        static get $inject() {
            return ['$http']
        }
        constructor($http) {
            this.$http = $http;
        }
        getModules() {
            return this.$http.get('/api/modules', this.getHttpConfig())
                .then(res => res.data);
        }

        addModule(module) {
            return this.$http.post('/api/modules', module, this.getHttpConfig())
        }

        getTimeline() {
            return this.$http.get('/api/groups')
                .then(res => res.data)
        }

        getReadme(gitRepo) {
            return this.$http.get('/api/github/readme/hackyourfuture/' + gitRepo)
                .then(res => res.data);
        }

        getMyProfile() {
            return this.$http.get('/api/user', this.getHttpConfig())
                .then(res => res.data);
        }

        getUsersProfile() {
            return this.$http.get('/api/users', this.getHttpConfig())
                .then(res => res.data);
        }

        updateUserRole(userId, role) {
            return this.$http.patch('/api/user/' + userId, { "role": role }, this.getHttpConfig())
        }

        getHttpConfig() {
            let config = {};
            let token = window.localStorage.getItem('token');
            if (token) {
                config.headers = { 'Authorization': 'Bearer ' + token };
            }
            return config;
        }
    }

    angular
        .module('hyferApp')
        .service('backendService', backendService)
}());