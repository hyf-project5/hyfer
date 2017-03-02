'use strict';
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const config = require('../config/config.js')

passport.use(new GitHubStrategy({
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, { accessToken, username: profile.username });
    }));

passport.serializeUser(function(user, done) {
    // console.log('serializeUser');
    // console.log(util.inspect(user));
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    // console.log('deserializeUser');
    // console.log(util.inspect(user));
    done(null, user);
});