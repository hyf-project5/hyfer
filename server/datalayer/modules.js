'use strict';
const db = require('./database');

const GET_MODULE_QUERY = `SELECT * FROM modules`;
const ADD_MODULE_QUERY = `INSERT INTO modules SET ?`;
const UPDATE_MODULE_QUERY = `UPDATE modules SET ? WHERE id = ?`;
const DELETE_MODULE_QUERY = `DELETE FROM modules WHERE id = ?`;

function getModule(con, id) {
    const sql = GET_MODULE_QUERY + ` WHERE id=?`;
    return db.execQuery(con, sql, [id])
}

function getModules(con) {
    const sql = GET_MODULE_QUERY + ` WHERE module_name != 'Dummy' ORDER BY seq_number`;
    return db.execQuery(con, sql);
}

function getCurriculumModules(con) {
    const sql = GET_MODULE_QUERY + ` WHERE seq_number IS NOT NULL ORDER BY seq_number`;
    return db.execQuery(con, sql);
}

function getOptionalModules(con) {
    const sql = GET_MODULE_QUERY + ` WHERE seq_number IS NULL ORDER BY module_name`;
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
    getCurriculumModules,
    getOptionalModules,
    addModule,
    updateModule,
    deleteModule,
}