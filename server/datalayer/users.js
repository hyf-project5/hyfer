'use strict';
const db = require('./database');

// Users functions
function getUser(con, username) {
    return db.execQuery(con, `SELECT username, role, register_date FROM users WHERE username=?`, username);
}

function getUsers(con) {
    return db.execQuery(con, `SELECT username, role, register_date FROM users`);
}

function addUser(con, user) {
    return db.execQuery(con, `INSERT INTO users SET ?`, user)
}

function updateRole(con, id, role) {
    return db.execQuery(con, 'UPDATE users SET role=? WHERE id=?', [role, id])
}

module.exports = {
    getUser,
    getUsers,
    addUser,
    updateRole
}