'use strict';
const db = require('./database');
const modules = require('./modules');

const TIME_LINE_FOR_ALL_GROUPS_QUERY =
    `SELECT groups.id,
        groups.group_name,
        groups.starting_date,
        running_modules.description,
        running_modules.duration,
        modules.module_name,
        modules.git_url,
        modules.git_repo
    FROM groups
    INNER JOIN running_modules ON running_modules.group_id = groups.id
    INNER JOIN modules ON running_modules.module_id = modules.id
    ORDER BY groups.starting_date, running_modules.position`;


const ADD_GROUP_QUERY = `INSERT INTO groups SET ?`;
const UPDATE_GROUP_QUERY = `UPDATE groups SET ? WHERE id = ?`;
const DELETE_GROUP_QUERY = `DELETE FROM groups WHERE id = ?`;

const ADD_RUNNING_MODULES_QUERY =
    `INSERT INTO running_modules (description, module_id, group_id, duration, position) VALUES`;

// user story / User ➜ 1)
function getTimelineForAllGroups(con) {
    return db.execQuery(con, TIME_LINE_FOR_ALL_GROUPS_QUERY);
}

function updateGroup(con, module, id) {
    return db.execQuery(con, UPDATE_GROUP_QUERY, [module, id]);
}

function deleteGroup(con, id) {
    return db.execQuery(con, DELETE_GROUP_QUERY, [id]);
}

function addGroup(con, group) {

    let data = {
            group_name: group.group_name,
            starting_date: new Date(group.starting_date)
        }
        // TODO: use a SQL transaction

    return db.execQuery(con, ADD_GROUP_QUERY, data)
        .then(result => {
            let groupId = result.insertId;
            return modules.getCurriculumModules(con)
                .then(mods => {
                    let runningModules = makeRunningModules(groupId, mods);
                    let valueList = makeValueList(runningModules);
                    let sql = ADD_RUNNING_MODULES_QUERY + valueList;
                    return db.execQuery(con, sql);
                });
        });
}

function makeRunningModules(groupId, mods) {
    return mods.map((module, position) => ({
        description: module.description,
        module_id: module.id,
        group_id: groupId,
        duration: module.default_duration,
        position: position
    }));
}

function makeValueList(runningModules) {
    return runningModules.reduce((str, mod) => {
        if (str.length > 0) {
            str += ',';
        }
        return str + `('${mod.description}',${mod.module_id},${mod.group_id},${mod.duration},${mod.position})`
    }, '');
}

module.exports = {
    getTimelineForAllGroups,
    addGroup,
    updateGroup,
    deleteGroup
}