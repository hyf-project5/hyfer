'use strict'
const db = require('./database')

// Users functions
function getUser (con, username) {
  return db.execQuery(con, `SELECT id, username, full_name, role, slack_username, freecodecamp_username, email, mobile, register_date, group_name FROM users WHERE username=?`, username)
}

function getUserById (con, id) {
  return db.execQuery(con, `SELECT id, username, full_name, role, slack_username, freecodecamp_username, email, mobile, register_date, group_name FROM users WHERE id=?`, id)
}

function getUsers (con) {
  return db.execQuery(con, `SELECT * FROM users`)
}

function addUser (con, user) {
  return db.execQuery(con, `INSERT INTO users SET ?`, user)
}

function updateRole (con, id, role) {
  return db.execQuery(con, 'UPDATE users SET role=? WHERE id=?', [role, id])
}

module.exports = {
  getUser,
  getUsers,
  addUser,
  updateRole,
  getUserById
}
