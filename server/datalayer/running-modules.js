'use strict';
const db = require('./database');

const GET_RUNNING_MODULES_QUERY =
    `SELECT id, description, module_id, group_id, duration, seq_number, teacher1_id, teacher2_id
    FROM running_modules`;
const ADD_RUNNING_MODULE_QUERY = `INSERT INTO running_modules SET ?`;
const UPDATE_RUNNING_MODULE_QUERY = `UPDATE running_modules SET ? WHERE id = ?`;
const DELETE_RUNNING_MODULE_QUERY = `DELETE FROM running_modules WHERE id = ?`;

function getRunningModule(con, id) {
    const sql = GET_RUNNING_MODULES_QUERY + ` WHERE id=?`;
    return db.execQuery(con, sql, [id])
}

function getRunningModules(con, groupId) {
    const sql = GET_RUNNING_MODULES_QUERY + ` WHERE group_id=? ORDER BY seq_number`;
    return db.execQuery(con, sql, [groupId]);
}

function addRunningModule(con, runningModule) {
    return db.execQuery(con, ADD_RUNNING_MODULE_QUERY, runningModule);
}

function updateRunningModule(con, runningModule, id) {
    return db.execQuery(con, UPDATE_RUNNING_MODULE_QUERY, [runningModule, id]);
}

function deleteRunningModule(con, id) {
    return db.execQuery(con, DELETE_RUNNING_MODULE_QUERY, [id]);
}

module.exports = {
    getRunningModule,
    getRunningModules,
    addRunningModule,
    updateRunningModule,
    deleteRunningModule,
}