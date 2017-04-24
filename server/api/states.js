const getConnection = require('./connection').getConnection;
const db = require('../datalayer/states');

function getStudentsState(req, res){
    getConnection(req, res)
        .then(con => db.getStudentsState(con, req.params.groupId))
        .then(result => res.statusStatus(result.affectedRows > 0 ? 200 : 404));    
}

// function saveStudentsState(req, res){
//     getConnection(req, res)
//         .then(con => db.saveStudentsState(con, req.params.groupId))
//         .then(result => res.statusStatus(result.affectedRows > 0 ? 200 : 404));
// }

module.exprots ={
  getStudentsState,
  // saveStudentsState
};