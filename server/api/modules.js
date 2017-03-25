'use strict';
const db = require('../datalayer/modules');
const getConnection = require('./connection').getConnection;

function getModules(req, res) {
    getConnection(req, res)
        .then(con => db.getModules(con))
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));

}

function addModule(req, res) {
    getConnection(req, res)
        .then(con => db.addModule(con, req.body))
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).json(err));

}

function updateModule(req, res) {
    getConnection(req, res)
        .then(con => db.updateModule(con, req.body, req.params.id))
        .then(result => res.sendStatus(result.affectedRows > 0 ? 200 : 404))
        .catch(err => res.status(500).json(err));

}

function deleteModule(req, res) {
    getConnection(req, res)
        .then(con => db.deleteModule(con, req.params.id))
        .then(result => res.sendStatus(result.affectedRows > 0 ? 200 : 404))
        .catch(err => res.status(500).json(err));

}

function updateModules(req, res) {
    getConnection(req, res)
        .then(con => {
            let receivedModules = req.body;
            return db.getModules(con)
                .then(currentModules => {
                    let batchUpdate = createBatchUpdate(currentModules, receivedModules);
                    return db.updateModules(con, batchUpdate);
                })
                .then(() => db.getModules(con))
        })
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
}


function createBatchUpdate(currentModules, receivedModules) {
    let updates = [];
    let additions = [];

    receivedModules.forEach((receivedModule, index) => {
        receivedModule.seq_number = index;
    });

    currentModules.forEach(currentModule => {
        currentModule.visited = false;
    });

    receivedModules.forEach(receivedModule => {
        let currentModule = currentModules.find(module => module.id === receivedModule.id);
        if (!currentModule) {
            delete receivedModule.id;
            additions.push(receivedModule);
        } else if (!compareModules(currentModule, receivedModule)) {
            currentModule.visited = true;
            updates.push(receivedModule);
        } else {
            currentModule.visited = true;
        }
    });

    let deletions = currentModules.filter(currentModule => !currentModule.visited);

    return { updates, additions, deletions };
}

function compareModules(mod1, mod2) {
    return mod1.id === mod2.id &&
        mod1.module_name === mod2.module_name &&
        mod1.description === mod2.description &&
        mod1.default_duration === mod2.default_duration &&
        mod1.seq_number === mod2.seq_number &&
        mod1.git_url === mod2.git_url &&
        mod1.git_owner === mod2.git_owner &&
        mod1.git_repo === mod2.git_repo;
}

module.exports = {
    getModules,
    addModule,
    updateModule,
    deleteModule,
    updateModules,
    createBatchUpdate
}