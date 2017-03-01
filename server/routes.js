'use strict';
const util = require('util');
const passport = require('passport');
require('./auth/github-auth');
const modules = require('./api/modules'); // Modules tabel API
const users = require('./api/users');
const groups = require('./api/groups'); // Groups 'classes' tabel API
const jwt = require('jsonwebtoken');
const config = require('./config/config.js')
const EXPIRES_IN_SECONDS = 30 * 24 * 60 * 60;

module.exports = function(app) {

    // modules HTTP methods
    app.get('/modules', modules.getCurriculum);
    app.get('/modules/:id', modules.getModule);
    app.post('/modules', modules.addModule);
    app.patch('/modules/:id', modules.updateModule);
    app.delete('/modules/:id', modules.deleteModule);

    // groups HTTP methods
    app.get('/groups', groups.getTimelineForAllGroups);
    app.get('/groups/:id', groups.getTimelineForAGroup);
    app.post('/groups', groups.addGroup);
    app.patch('/groups/:id', groups.updateGroup);
    app.delete('/groups/:id', groups.deleteGroup);

    // Github authentication
    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), setTokenCookie);

    function signToken(username) {
        return jwt.sign({ username }, config.jwtSecret, { expiresIn: EXPIRES_IN_SECONDS })
    }

    function setTokenCookie(req, res) {
        if (!req.user) {
            return void res.status(404).json({ message: 'Something went wrong, please try again.' })
        }
        let token = signToken(req.user.username)
        res.cookie('token', JSON.stringify(token), { maxAge: EXPIRES_IN_SECONDS * 1000 })
        console.log(JSON.stringify(token));
        res.redirect('#!/modules');
    }
};