'use strict';
const db = require('../datalayer/modules');
const getConnection = require('./connection').getConnection;

function getModules(req, res) {
    getConnection(req, res)
        .then(con => db.getModules(con))
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

module.exports = {
    getModules,
    addModule,
    updateModule,
    deleteModule
}