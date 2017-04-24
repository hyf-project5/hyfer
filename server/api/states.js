const getConnection = require('./connection').getConnection;
const db = require('../datalayer/states');

function getStudentsState(req, res){
    getConnection(req, res)
        .then(con => db.getStudentsState(con, req.params.groupId))
        .then(result => res.status(result.affectedRows > 0 ? 200 : 404).json(result));    
}

// function saveStudentsState(req, res){
//     getConnection(req, res)
//         .then(con => db.saveStudentsState(con, req.params.groupId))
//         .then(result => res.statusStatus(result.affectedRows > 0 ? 200 : 404));
// }

module.exports ={
  getStudentsState,
  // saveStudentsState
};