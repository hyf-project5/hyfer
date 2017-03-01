'use strict';
const util = require('util');
const db = require('../database/database');

function callback(req, res, next) {

    console.log('callback: ' + util.inspect(req.user));
    getConnection(req, res)
        .then(con => {
            return db.getUser(con, req.user.username)
                .then(rows => {
                    if (rows.length > 0) {
                        req.user = rows[0];
                        return Promise.resolve();
                    }

                    let user = {
                        username: req.user.username,
                        access_token: req.user.accessToken,
                        oauth_provider: 'github',
                        role: null
                    }
                    req.user = user;
                    return db.addUser(con, user);
                })
        })
        .then(() => {
            console.log(util.inspect(req.user));
            next();
        })
        .catch(err => {
            console.log('Error: ' + err);
        })
        // Successful authentication, redirect home.
        // res.redirect('#!/modules');
}


function getConnection(req, res) {
    return new Promise((resolve, reject) => {
        req.getConnection((err, con) => {
            if (err) {
                res.sendStatus(500);
                reject(err);
            } else {
                resolve(con);
            }
        });
    });
}

module.exports = {
    callback
}