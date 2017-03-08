'use strict';
const db = require('../datalayer/running-modules');
const getConnection = require('./connection').getConnection;

function getRunningModules(req, res) {
    let groupId = parseInt(req.params.groupId, 10);
    getConnection(req, res)
        .then(con => db.getRunningModules(con, groupId))
        .then(result => res.json(result));
}

function addModuleToRunningModules(req, res) {
    getConnection(req, res)
        .then(con => db.addRunningModule(con, req.body))
        .then(() => res.statusStatus(200));
}

function updateRunningModule(req, res) {
    getConnection(req, res)
        .then(con => db.updateRunningModule(con, req.body, req.params.id))
        .then(result => res.sendStatus(result.affectedRows > 0 ? 200 : 404));
}

function deleteRunningModule(req, res) {
    getConnection(req, res)
        .then(con => db.deleteRunningModule(con, req.params.id))
        .then(result => res.sendStatus(result.affectedRows > 0 ? 200 : 404));
}

module.exports = {
    getRunningModules,
    addModuleToRunningModules,
    updateRunningModule,
    deleteRunningModule
}