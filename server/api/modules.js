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
        .then(() => res.status(200).send('Moudle added!'));

}

function updateModule(req, res) {
    getConnection(req, res)
        .then(con => db.updateModule(con, req.body, req.params.id))
        .then(result => res.status(result.affectedRows > 0 ? 200 : 404).send(result.affectedRows > 0 ? 'Module updated!' : 'Nothing found!'));
}

function deleteModule(req, res) {
    getConnection(req, res)
        .then(con => db.deleteModule(con, req.params.id))
        .then(result => res.status(result.affectedRows > 0 ? 200 : 404).send(result.affectedRows > 0 ? 'Module deleted!' : 'Nothing found!'));
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