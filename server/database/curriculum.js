'use strict';
const GET_MODULE_QUERY =
    `SELECT id, module_name, description, seq_number, added_on, module_img, default_duration, git_url, git_owner, git_repo
    FROM modules`;
const ADD_GROUP_QUERY = `INSERT INTO groups SET ?`;


function getCurriculum(con) {
    const sql = GET_MODULE_QUERY + ` ORDER BY seq_number`;
    return execQuery(con, sql);
}



function addGroup(con, module) {
    return execQuery(con, ADD_GROUP_QUERY, module)
     .then(result => {
         let addedGroupId = result.insertId;
         
        console.log(result.insertId);
    });
}
// Execute Query

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
    getCurriculum,
    addGroup,
    execQuery
}