'use strict';
const passport = require('passport');
require('./auth/github-auth');
const authService = require('./auth/auth-service');
const modules = require('./api/modules');
const github = require('./api/github');

module.exports = function(app) {

    // modules HTTP methods
    app.get('/modules', modules.getCurriculum);
    app.get('/modules/:id', modules.getModule);
    app.post('/modules', modules.addModule);
    app.patch('/modules/:id', modules.updateModule);
    app.delete('/modules/:id', authService.hasRole('teacher'), modules.deleteModule);

    // GitHub module README's
    app.get('/github/readme/:owner/:repo', github.getReadMeAsHtml);

    // Github authentication
    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
        authService.gitHubCallback, authService.setTokenCookie);
};