'use strict';
const db = require('../database/database');

function getCurriculum(req, res) {
    getConnection(req, res)
        .then(con => db.getCurriculum(con))
        .then(result => res.json(result));
}

function getModule(req, res) {
    getConnection(req, res)
        .then(con => db.getModule(con, req.params.id))
        .then(result => res.json(result));
}

function addModule(req, res) {
    getConnection(req, res)
        .then(con => db.addModule(con, req.body))
        .then(() => res.sendStatus(200));

}

function updateModule(req, res) {
    getConnection(req, res)
        .then(con => db.updateModule(con, req.body, req.params.id))
        .then(result => res.sendStatus(result.affectedRows > 0 ? 200 : 404));
}

function deleteModule(req, res) {
    getConnection(req, res)
        .then(con => db.deleteModule(con, req.params.id))
        .then(result => res.sendStatus(result.affectedRows > 0 ? 200 : 404));
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
    getModule,
    getCurriculum,
    addModule,
    updateModule,
    deleteModule
}