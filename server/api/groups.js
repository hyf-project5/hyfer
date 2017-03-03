'use strict';
const _ = require('lodash');
const db = require('../datalayer/groups');

function getTimelineForAllGroups(req, res) {
    getConnection(req, res)
        .then(con => db.getTimelineForAllGroups(con))
        .then(result => {
            let groupedModules = _.groupBy(result, module => module.group_name);
            res.json(groupedModules);
        });
    // .then(result => {res.json(result); console.log(result);});
}

function getTimelineForAGroup(req, res) {
    getConnection(req, res)
        .then(con => db.getTimelineForAGroup(con, req.params.id))
        .then(result => {
            let groupedModules = _.groupBy(result, module => module.group_name);
            res.json(groupedModules);
        });
}

function addGroup(req, res) {
    getConnection(req, res)
        .then(con => db.addGroup(con, req.body))
        .then(() => res.sendStatus(200));
}

function updateGroup(req, res) {
    getConnection(req, res)
        .then(con => db.updateGroup(con, req.body, req.params.id))
        .then(result => res.sendStatus(result.affectedRows > 0 ? 200 : 404));
}

function deleteGroup(req, res) {
    getConnection(req, res)
        .then(con => db.deleteGroup(con, req.params.id))
        .then(result => res.statusStatus(result.affectedRows > 0 ? 200 : 404));
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
    getTimelineForAllGroups,
    getTimelineForAGroup,
    addGroup,
    updateGroup,
    deleteGroup
}