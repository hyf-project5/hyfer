'use strict';
const util = require('util');
const passport = require('passport');
require('./auth/github-auth');
const modules = require('./api/modules'); // Modules tabel API
const users = require('./api/users');
// const accounts = require('./api/accounts'); // Accounts tabel API
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

    // accounts HTTP methods
    // app.get('/accounts', accounts.list);
    // app.get('/accounts/:id', accounts.account_details);
    // app.post('/accounts', accounts.add);
    // app.patch('/accounts/:id', accounts.update);
    // app.delete('/accounts/:id', accounts.delete_account);

    // Github authentication
    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), users.callback, setTokenCookie);

    function signToken(username, role) {
        return jwt.sign({ user: username, role: role || 'guest' }, config.jwtSecret, { expiresIn: EXPIRES_IN_SECONDS })
    }

    function setTokenCookie(req, res) {
        if (!req.user) {
            return void res.status(404).json({ message: 'Something went wrong, please try again.' })
        }
        let token = signToken(req.user.username, req.user.role);
        res.cookie('token', JSON.stringify(token), { maxAge: EXPIRES_IN_SECONDS * 1000 })
        console.log('cookie: ' + JSON.stringify(token));
        res.redirect('#!/modules');
    }
};