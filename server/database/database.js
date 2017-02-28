'use strict';

const GET_MODULE_QUERY =
    `SELECT id, module_name, description, seq_number, added_on, module_img, default_duration, git_url, git_owner
    FROM modules`;

const TIME_LINE_FOR_GROUP_QUERY =
    `SELECT groups.group_name,
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

const ADD_MODULE_QUERY = `INSERT INTO modules SET ?`;
const UPDATE_MODULE_QUERY = `UPDATE modules SET ? WHERE id = ?`;
const DELETE_MODULE_QUERY = `DELETE FROM modules WHERE id = ?`;

const GET_USER_QUERY = `SELECT * FROM users WHERE username=?`;
const ADD_USER_QUERY = `INSERT INTO users SET ?`;

function getUser(con, username) {
    return execQuery(con, GET_USER_QUERY, username);
}

function addUser(con, user) {
    return execQuery(con, ADD_USER_QUERY, user)
}

function getModule(con, id) {
    const sql = GET_MODULE_QUERY + ` WHERE id=?`;
    return execQuery(con, sql, [id])
        .then(rows => {
            let results = [];
            // convert rows into array of modules
            return results;
        });
}

function getCurriculum(con) {
    const sql = GET_MODULE_QUERY + ` ORDER BY seq_number`;
    return execQuery(con, sql);
}

// user story 1
function getTimelineForGroup(con, id) {
    return execQuery(con, TIME_LINE_FOR_GROUP_QUERY, [id])
        .then(rows => {
            let results = [];
            // convert rows into array of data timeline object
            return results;
        });
}

function addModule(con, module) {
    return execQuery(con, ADD_MODULE_QUERY, module);
}

function updateModule(con, module, id) {
    return execQuery(con, UPDATE_MODULE_QUERY, [module, id]);
}

function deleteModule(con, id) {
    return execQuery(con, DELETE_MODULE_QUERY, [id]);
}

function execQuery(con, sql, args = []) {
    return new Promise((resolve, reject) => {
        con.query(sql, args, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = {
    getUser,
    addUser,
    getModule,
    getCurriculum,
    getTimelineForGroup,
    addModule,
    updateModule,
    deleteModule
}