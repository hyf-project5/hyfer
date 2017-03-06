'use strict';
const db = require('./database');
const modules = require('./modules');

const WEEKS_TO_MSEC_FACTOR = 7 * 24 * 60 * 60 * 1000;

const TIME_LINE_FOR_ALL_GROUPS_QUERY =
    `SELECT groups.id,
        groups.group_name,
        groups.starting_date,
        running_modules.starting_on,
        running_modules.scheduled_end,
        running_modules.finished,
        running_modules.duration,
        modules.module_name,
        modules.module_img,
        modules.git_url,
        modules.git_repo
    FROM groups
    INNER JOIN running_modules ON running_modules.group_id = groups.id
    INNER JOIN modules ON running_modules.module_id = modules.id
    ORDER BY running_modules.starting_on`;

const TIME_LINE_FOR_GROUP_QUERY =
    `SELECT groups.id,
        groups.group_name,
        running_modules.starting_on,
        running_modules.scheduled_end,
        running_modules.finished,
        modules.module_name,
        modules.module_img,
        modules.git_url,
        modules.git_repo
    FROM groups
    INNER JOIN running_modules ON running_modules.group_id = groups.id
    INNER JOIN modules ON running_modules.module_id = modules.id
    WHERE groups.id = ?
    ORDER BY running_modules.starting_on`;

const ADD_GROUP_QUERY = `INSERT INTO groups SET ?`;
const UPDATE_GROUP_QUERY = `UPDATE groups SET ? WHERE id = ?`;
const DELETE_GROUP_QUERY = `DELETE FROM groups WHERE id = ?`;

const ADD_RUNNING_MODULES_QUERY =
    `INSERT INTO running_modules (starting_on, scheduled_end, description, module_id, group_id, finished) VALUES`;

// user story / User ➜ 1)
function getTimelineForAllGroups(con) {
    return db.execQuery(con, TIME_LINE_FOR_ALL_GROUPS_QUERY);
}

function getTimelineForAGroup(con, id) {
    return db.execQuery(con, TIME_LINE_FOR_GROUP_QUERY, [id]);
}


function updateGroup(con, module, id) {
    return db.execQuery(con, UPDATE_GROUP_QUERY, [module, id]);
}

function deleteGroup(con, id) {
    return db.execQuery(con, DELETE_GROUP_QUERY, [id]);
}

function addGroup(con, group) {

    // TODO: use a SQL transaction

    let startingDate = new Date(group.starting_date);

    return db.execQuery(con, ADD_GROUP_QUERY, group)
        .then(result => {
            let groupId = result.insertId;
            return modules.getModules(con)
                .then(mods => {
                    let runningModules = generateRunningModules(startingDate, groupId, mods);
                    let valueList = runningModules.reduce((str, mod) => {
                        if (str.length > 0) {
                            str += ',';
                        }
                        return str + `('${mod.starting_on}','${mod.scheduled_end}','${mod.description}',${mod.module_id},${mod.group_id},${mod.finished})`
                    }, '');
                    let sql = ADD_RUNNING_MODULES_QUERY + valueList;
                    console.log(sql);
                    return db.execQuery(con, sql);
                });
        });
}

function generateRunningModules(startingDate, groupId, mods) {

    let startingOnMsecs = startingDate.getTime();

    return mods.map(module => {
        let scheduledEndMsecs = startingOnMsecs + module.default_duration * WEEKS_TO_MSEC_FACTOR;
        let runningModule = {
            starting_on: msecsToMySQLDate(startingOnMsecs),
            scheduled_end: msecsToMySQLDate(scheduledEndMsecs),
            description: module.description,
            module_id: module.id,
            group_id: groupId,
            finished: false
        }
        startingOnMsecs = scheduledEndMsecs;
        return runningModule;
    });
}

// Add curriculum to the new group
function addCurriculumToTheNewGroup(result) {
    // Execute getCurriculum
    // return db.execQuery(Insert default curriculum to running_modules for the new group:
    // starting_on (from the next sunday maybe?, scheduled_end (plus three weeks), description (Just copy it from module.description), module_id, new.group_id);
    console.log(result);

}

function msecsToMySQLDate(msecs) {
    let date = new Date(msecs);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

module.exports = {
    getTimelineForAllGroups,
    getTimelineForAGroup,
    addGroup,
    updateGroup,
    deleteGroup,
    addCurriculumToTheNewGroup
}