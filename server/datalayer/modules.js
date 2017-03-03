'use strict';
const db = require('./database');

// Modules queries

const GET_MODULE_QUERY =
    `SELECT id, module_name, description, seq_number, added_on, module_img, default_duration, git_url, git_owner, git_repo
    FROM modules`;
const ADD_MODULE_QUERY = `INSERT INTO modules SET ?`;
const UPDATE_MODULE_QUERY = `UPDATE modules SET ? WHERE id = ?`;
const DELETE_MODULE_QUERY = `DELETE FROM modules WHERE id = ?`;

// Modules functions

function getModule(con, id) {
    const sql = GET_MODULE_QUERY + ` WHERE id=?`;
    return db.execQuery(con, sql, [id])
}

function getModules(con) {
    const sql = GET_MODULE_QUERY + ` ORDER BY seq_number`;
    return db.execQuery(con, sql);
}

function addModule(con, module) {
    return db.execQuery(con, ADD_MODULE_QUERY, module);
}

function updateModule(con, module, id) {
    return db.execQuery(con, UPDATE_MODULE_QUERY, [module, id]);
}

function deleteModule(con, id) {
    return db.execQuery(con, DELETE_MODULE_QUERY, [id]);
}

module.exports = {
    getModule,
    getModules,
    addModule,
    updateModule,
    deleteModule,
}