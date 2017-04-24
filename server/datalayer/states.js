const db = require('./database');
const GET_CURRENT_STATE = `
  SELECT group_id, user_id, full_name, group_name FROM group_students 
  JOIN users u ON user_id = u.id
  JOIN groups g ON group_id = g.id 
  WHERE group_id=?
`;

// const SAVE_CURRENT_STATE =`
  
// `;

function getStudentsState(con, groupId){
  return db.execQuery(con, GET_CURRENT_STATE, groupId);
}

// function saveStudentsState(con, data){
//   return db.execQuery(con, SAVE_CURRENT_STATE, [data]);
// }

module.exports = {
  getStudentsState,
  // saveStudentsState
}