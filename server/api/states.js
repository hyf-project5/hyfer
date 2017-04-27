const getConnection = require('./connection').getConnection;
const db = require('../datalayer/states');

function getStudentsState(req, res) {
  getConnection(req, res)
    .then(con => db.getStudentsState(con, req.params.groupId))
    .then(result => res.status(result.affectedRows > 0 ? 200 : 404).json(result));
}


function makeUserListToUpdate(user) {
  return {
    id: user.id,
    username: user.username,
    full_name: user.full_name,
    role: user.role,
    slack_username: user.slack_username,
    freecodecamp_username: user.freecodecamp_username,
    email: user.email,
    mobile: user.mobile,
  }
}

function updateUser(req, res, next) {
  getConnection(req, res)
    .then(con => db.updateUser(con, makeUserListToUpdate(req.body)))
    .then(result => res.status(result.affectedRows > 0 ? next() : 404))
    .then(result => res.status(result.affectedRows))
}

function assignToClass(req, res) {
  let userAndGroupIds = [req.body.group_id, req.body.id];
  getConnection(req, res)
    .then(con => db.assignToClass(con, userAndGroupIds))
    .then(result => res.status(result.affectedRows > 0 ? 200 : 404).json(result))
    .catch(err => res.status(400).json(err))
}


module.exports = {
  getStudentsState,
  updateUser,
  assignToClass
};