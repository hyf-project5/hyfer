'use strict';
const passport = require('passport');
require('./auth/github-auth');
const authService = require('./auth/auth-service');
const github = require('./api/github');

const modules = require('./api/modules');
const groups = require('./api/groups');

module.exports = function(app) {

    app.get('/api/modules', modules.getCurriculum);
    app.get('/api/modules/:id', modules.getModule);
    app.post('/api/modules', modules.addModule);
    app.patch('/api/modules/:id', modules.updateModule);
    app.delete('/api/modules/:id', authService.hasRole('teacher'), modules.deleteModule);

    app.get('/api/groups', groups.getTimelineForAllGroups);
    app.get('/api/groups/:id', groups.getTimelineForAGroup);
    app.post('/api/groups', groups.addGroup);
    app.patch('/api/groups/:id', groups.updateGroup);
    app.delete('/api/groups/:id', groups.deleteGroup);

    app.get('/api/github/readme/:owner/:repo', github.getReadMeAsHtml);

    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
        authService.gitHubCallback, authService.setTokenCookie);
};