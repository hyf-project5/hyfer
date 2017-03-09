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
    let moduleId = parseInt(req.params.moduleId, 10);
    let groupId = parseInt(req.params.groupId, 10);
    let position = parseInt(req.params.position, 10);
    getConnection(req, res)
        .then(con => db.addModuleToRunningModules(con, moduleId, groupId, position))
        .then(result => res.json(result));
}

function updateRunningModule(req, res) {
    console.log('updateRunningModule');
    let groupId = parseInt(req.params.groupId, 10);
    let position = parseInt(req.params.position, 10);
    let updates = req.body;
    getConnection(req, res)
        .then(con => db.updateRunningModule(con, updates, groupId, position))
        .then(result => res.json(result));
}

function deleteRunningModule(req, res) {
    let groupId = parseInt(req.params.groupId, 10);
    let position = parseInt(req.params.position, 10);
    getConnection(req, res)
        .then(con => db.deleteRunningModule(con, groupId, position))
        .then(result => res.json(result));
}

module.exports = {
    getRunningModules,
    addModuleToRunningModules,
    updateRunningModule,
    deleteRunningModule
}