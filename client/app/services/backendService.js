import angular from 'angular';

import servicesModule from './services.module';

class backendService {
    static get $inject() {
        return ['$http'];
    }
    constructor($http) {
        this.$http = $http;
    }
    getModules() {
        return this.$http.get('/api/modules', this.getHttpConfig())
            .then(res => res.data);
    }
    saveModules(modules) {
        return this.$http.patch('/api/modules', modules, this.getHttpConfig())
            .then(res => res.data);
    }

    addRunningModule(moduleId, groupId, position) {
        return this.$http.patch(`/api/running/add/${moduleId}/${groupId}/${position}`, {}, this.getHttpConfig());
    }

    updateRunningModule(groupId, position, newRunningModule) {
        return this.$http.patch(`/api/running/update/${groupId}/${position}`, newRunningModule, this.getHttpConfig())
    }

    splitRunningModule(groupId, position) {
        return this.$http.patch(`/api/running/split/${groupId}/${position}`, {}, this.getHttpConfig());
    }

    updateRunningModule(groupId, position, newRunningModule) {
        return this.$http.patch(`/api/running/${groupId}/${position}`, newRunningModule, this.getHttpConfig());
    }

    deleteRunningModule(groupId, position) {
        return this.$http.delete(`/api/running/${groupId}/${position}`, this.getHttpConfig());
    }

    getTimeline() {
        return this.$http.get('/api/groups')
            .then(res => res.data);
    }

    addGroup(group) {
        return this.$http.post('/api/groups', group, this.getHttpConfig());
    }

    getReadme(gitRepo) {
        return this.$http.get('/api/github/readme/hackyourfuture/' + gitRepo)
            .then(res => res.data);
    }

    getMyProfile() {
        return this.$http.get('/api/user', this.getHttpConfig())
            .then(res => res.data);
    }

    getUsers() {
        return this.$http.get('/api/users', this.getHttpConfig())
            .then(res => res.data);
    }

    updateUserRole(userId, role) {
        console.log(userId);
        return this.$http.patch('/api/user/' + userId, { "role": role }, this.getHttpConfig());
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

const serviceName = 'backendService';

angular
    .module(servicesModule)
    .service(serviceName, backendService);

export default serviceName;