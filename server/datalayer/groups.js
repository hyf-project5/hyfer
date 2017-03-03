'use strict';
const db = require('./database');

// Groups queries
const TIME_LINE_FOR_ALL_GROUPS_QUERY =
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

function addGroup(con, module) {
    return db.execQuery(con, ADD_GROUP_QUERY, module)
        .then(result => {
            let addedGroupId = result.insertId;

            console.log(result.insertId);
        });
}

// Add curriculum to the new group
function addCurriculumToTheNewGroup(result) {
    // Execute getCurriculum
    // return db.execQuery(Insert default curriculum to running_modules for the new group:
    // starting_on (from the next sunday maybe?, scheduled_end (plus three weeks), description (Just copy it from module.description), module_id, new.group_id);
    console.log(result);
    d
}


module.exports = {
    getTimelineForAllGroups,
    getTimelineForAGroup,
    addGroup,
    updateGroup,
    deleteGroup,
    addCurriculumToTheNewGroup
}