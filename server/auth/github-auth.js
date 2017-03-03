'use strict';
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const config = require('../config/config.js')

passport.use(new GitHubStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL
}, (accessToken, refreshToken, profile, done) => {
    return done(null, { accessToken, username: profile.username });
}));