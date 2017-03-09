'use strict';
const db = require('./database');
const modules = require('./modules');

const GET_RUNNING_MODULES_QUERY = `SELECT description, duration, teacher1_id, teacher2_id FROM running_modules`;
const GET_ALL_FROM_RUNNING_MODULES_QUERY = `SELECT * FROM running_modules`;
const DELETE_ALL_RUNNING_MODULES_QUERY = `DELETE FROM running_modules WHERE group_id=?`;
const INSERT_RUNNING_MODULES_QUERY =
    `INSERT INTO running_modules (description, module_id, group_id, duration, position, teacher1_id, teacher2_id) VALUES`;

function getRunningModules(con, groupId) {
    const sql = GET_RUNNING_MODULES_QUERY + ` WHERE group_id=? ORDER BY position`;
    return db.execQuery(con, sql, [groupId]);
}

function getAllFromRunningModules(con, groupId) {
    const sql = GET_ALL_FROM_RUNNING_MODULES_QUERY + ` WHERE group_id=? ORDER BY position`;
    return db.execQuery(con, sql, [groupId]);
}

function addModuleToRunningModules(con, moduleId, groupId, position) {
    console.log('position: ' + position)

    return modules.getModule(con, moduleId)
        .then(rows => {
            let module = rows[0];
            let newMod = {
                description: module.description,
                module_id: moduleId,
                group_id: groupId,
                duration: module.default_duration,
                teacher1_id: 'NULL',
                teacher2_id: 'NULL'
            }
            return getAllFromRunningModules(con, groupId)
                .then(runningMods => {
                    insertRunningModuleAtIndex(runningMods, newMod, position);
                    resequenceRunningModules(runningMods);
                    return replaceRunningModules(con, runningMods, groupId);
                });
        });
}

function updateRunningModule(con, updates, groupId, position) {
    console.log('datalayer updateRunningModule');
    return getAllFromRunningModules(con, groupId)
        .then(runningMods => {
            let targetMod = runningMods.find(mod => mod.position === position);
            runningMods = runningMods.filter(mod => mod.position !== position);
            targetMod.description = updates.description || targetMod.description;
            targetMod.duration = updates.duration || targetMod.duration;
            targetMod.teacher1_id = updates.teacher1_id || targetMod.teacher1_id;
            targetMod.teacher2_id = updates.teacher2_id || targetMod.teacher2_id;
            insertRunningModuleAtIndex(runningMods, targetMod, updates.position || position);
            resequenceRunningModules(runningMods);
            return replaceRunningModules(con, runningMods, groupId);
        });
}

function deleteRunningModule(con, groupId, position) {
    return getAllFromRunningModules(con, groupId)
        .then(runningMods => {
            runningMods = runningMods.filter(mod => mod.position !== position);
            resequenceRunningModules(runningMods);
            return replaceRunningModules(con, runningMods, groupId);
        });
}

function replaceRunningModules(con, runningMods, groupId) {
    return new Promise((resolve, reject) => {
            con.beginTransaction(err => {
                if (err) {
                    return reject(err);
                }
                db.execQuery(con, DELETE_ALL_RUNNING_MODULES_QUERY, groupId)
                    .then(() => {
                        let valueList = makeValueList(runningMods);
                        let sql = INSERT_RUNNING_MODULES_QUERY + valueList;
                        return db.execQuery(con, sql);
                    })
                    .then(() => {
                        con.commit(err => {
                            if (err) {
                                throw err;
                            }
                            resolve();
                        })
                    })
                    .catch(err => {
                        con.rollback(() => {
                            reject(err);
                        })
                    })
            })
        })
        .then(() => getAllFromRunningModules(con, groupId));
}

function insertRunningModuleAtIndex(runningMods, targetMod, position) {
    if (position === -1) {
        runningMods.push(targetMod);
    } else if (position >= 0 && position < runningMods.length) {
        runningMods.splice(position, 0, targetMod)
    } else {
        throw new Error('invalid position: ' + position);
    }
}

function resequenceRunningModules(runningMods) {
    runningMods.forEach((runningModule, position) => {
        runningModule.position = position;
    });
}

function makeValueList(runningModules) {
    return runningModules.reduce((str, mod) => {
        if (str.length > 0) {
            str += ',';
        }
        return str + `('${mod.description}',${mod.module_id},${mod.group_id},${mod.duration},${mod.position},${mod.teacher1_id},${mod.teacher2_id})`
    }, '');
}

module.exports = {
    getRunningModules,
    addModuleToRunningModules,
    updateRunningModule,
    deleteRunningModule,
}