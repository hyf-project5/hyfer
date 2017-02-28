'use strict';
const util = require('util');
const db = require('../database/database');

function callback(req, res) {

    console.log(util.inspect(req.user));
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
                        oauth_provider: 'github'
                    }
                    req.user = user;
                    return db.addUser(con, user);
                })
        })
        .then(() => console.log(util.inspect(req.user)))
        .catch(err => {
            console.log('Error: ' + err);
        })
        // Successful authentication, redirect home.
    res.redirect('/');
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