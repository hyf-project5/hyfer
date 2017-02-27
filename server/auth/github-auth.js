'use strict';
const passport = require('passport');
const util = require('util');
const GitHubStrategy = require('passport-github').Strategy;
const config = require('../config/config.js')

passport.use(new GitHubStrategy({
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log('Github accessToken: ' + accessToken);
        console.log('Github refreshToken: ' + refreshToken);
        console.log('Github profile: ' + util.inspect(profile));
        return cb(null, accessToken);

        // User.findOrCreate({ githubId: profile.id }, function(err, user) {
        //     return cb(err, user);
        // });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});