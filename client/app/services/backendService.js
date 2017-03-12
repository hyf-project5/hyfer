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

        updateModule(moduleId, updatedModule) {
            return this.$http.patch('/api/modules/' + moduleId, updatedModule, this.getHttpConfig())
        }

        deleteModule(id) {
            return this.$http.delete('/api/modules/' + id, this.getHttpConfig())
        }

        addRunningModule(moduleId, groupId, position) {
            return this.$http.patch(`/api/running/${moduleId}/${groupId}/${position}`, {}, this.getHttpConfig())
        }

        updateRunningModule(groupId, position, newRunningModule) {
            return this.$http.patch(`/api/running/${groupId}/${position}`, newRunningModule, this.getHttpConfig())
        }

        deleteRunningModule(groupId, position) {
            return this.$http.delete(`/api/running/${groupId}/${position}`, this.getHttpConfig())
        }

        getTimeline() {
            return this.$http.get('/api/groups')
                .then(res => res.data)
        }

        addGroup(group) {
            return this.$http.post('/api/groups', group, this.getHttpConfig())
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
            console.log(userId)
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