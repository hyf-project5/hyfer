'use strict';
const passport = require('passport');
require('./auth/github-auth');
const authService = require('./auth/auth-service');
const github = require('./api/github');

// API requirements
const modules = require('./api/modules'); // Modules tabel API
const groups = require('./api/groups'); // Groups 'classes' tabel API
const config = require('./config/config.js')

module.exports = function(app) {

    // Routes API
    // modules HTTP methods
    app.get('/modules', modules.getCurriculum);
    app.get('/modules/:id', modules.getModule);
    app.post('/modules', modules.addModule);
    app.patch('/modules/:id', modules.updateModule);
    app.delete('/modules/:id', authService.hasRole('teacher'), modules.deleteModule);

    // groups HTTP methods
    app.get('/groups', groups.getTimelineForAllGroups);
    app.get('/groups/:id', groups.getTimelineForAGroup);
    app.post('/groups', groups.addGroup);
    app.patch('/groups/:id', groups.updateGroup);
    app.delete('/groups/:id', groups.deleteGroup);

    // GitHub module README's
    app.get('/github/readme/:owner/:repo', github.getReadMeAsHtml);

    // Github authentication
    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
        authService.gitHubCallback, authService.setTokenCookie);
};