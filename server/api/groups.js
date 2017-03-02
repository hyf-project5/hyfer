'use strict';
const _ = require('lodash');
const db = require('../database/database');
const defaultCurriculum = require('../database/curriculum');

function getTimelineForAllGroups(req, res) {
    getConnection(req, res)
        .then(con => db.getTimelineForAllGroups(con))
        .then(result => {let groupedModules = _.groupBy(result, module => module.group_name);
            res.json(groupedModules);});
        // .then(result => {res.json(result); console.log(result);});
}

function getTimelineForAGroup(req, res) {
    getConnection(req, res)
        .then(con => db.getTimelineForAGroup(con, req.params.id))
        .then(result => {let groupedModules = _.groupBy(result, module => module.group_name);
            res.json(groupedModules);});
}

function addGroup(req, res) {
    getConnection(req, res)
        .then(con => defaultCurriculum.addGroup(con, req.body))
        .then(result => res.status(200).send('Group added!'));
     
}

function updateGroup(req, res) {
    getConnection(req, res)
        .then(con => db.updateGroup(con, req.body, req.params.id))
        .then(result => res.status(result.affectedRows > 0 ? 200 : 404).send(result.affectedRows > 0 ? 'Group updated!' : 'Nothing found!'));
}

function deleteGroup(req, res) {
    getConnection(req, res)
        .then(con => db.deleteGroup(con, req.params.id))
        .then(result => res.status(result.affectedRows > 0 ? 200 : 404).send(result.affectedRows > 0 ? 'Group deleted!' : 'Nothing found!'));
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