/* eslint-env node, mocha */
'use strict';
const mysql = require('mysql');
const chai = require('chai');
const expect = chai.expect;
const util = require('util');
const config = require('../server/config/config');
const db = require('../server/datalayer/database');
const dbRunningModules = require('../server/datalayer/running-modules');

const targetClass = 'Class 5';

let con;
let groupId;
let moduleId;
let runningModulesLength;

before(done => {
    con = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    });
    con.connect(err => {
        if (err) {
            console.log('Could not connect to MySQL database...');
            done(err);
        } else {
            console.log('Connected to MySQL database...');
            done();
        }
    });
});

beforeEach(done => {
    db.execQuery(con, `SELECT id FROM groups WHERE group_name = '${targetClass}'`)
        .then(groups => {
            groupId = groups[0].id;
            return db.execQuery(con, `SELECT id FROM modules WHERE module_name='Dummy'`)
                .then(modules => {
                    moduleId = modules[0].id;
                })
                .then(() => db.execQuery(con, `SELECT id FROM running_modules WHERE group_id=?`, groupId))
                .then(rows => {
                    runningModulesLength = rows.length;
                    done();
                })
        })
        .catch(err => done(err));
});

afterEach(done => {
    db.execQuery(con, `DELETE FROM running_modules WHERE module_id=?`, [moduleId])
        .then(() => done())
        .catch(err => done(err))
});

describe('running modules', () => {

    it('should add a module at the end of the running modules list', done => {
        dbRunningModules.addModuleToRunningModules(con, moduleId, groupId, -1)
            .then(runningModules => {
                let targetModule = runningModules[runningModules.length - 1];
                expect(targetModule.module_id).to.be.equal(moduleId);
                expect(targetModule.group_id).to.be.equal(groupId);
                expect(runningModules.length).to.be.equal(runningModulesLength + 1);
                done();
            })
            .catch(err => {
                done(err);
            })
    });

    it('should add a module at position 1 of the running modules list', done => {
        dbRunningModules.addModuleToRunningModules(con, moduleId, groupId, 1)
            .then(runningModules => {
                let targetModule = runningModules[1];
                expect(targetModule.module_id).to.be.equal(moduleId);
                expect(targetModule.group_id).to.be.equal(groupId);
                expect(runningModules.length).to.be.equal(runningModulesLength + 1);
                done();
            })
            .catch(err => {
                done(err);
            })
    });

    it('should move a running module from position 1 to position 3', done => {
        let updates = { position: 3 };
        dbRunningModules.addModuleToRunningModules(con, moduleId, groupId, 1)
            .then(() => {
                return dbRunningModules.updateRunningModule(con, updates, groupId, 1)
                    .then(runningModules => {
                        let targetModule = runningModules[3];
                        expect(targetModule.module_id).to.be.equal(moduleId);
                        expect(targetModule.group_id).to.be.equal(groupId);
                        expect(runningModules.length).to.be.equal(runningModulesLength + 1);
                        done();
                    });
            })
            .catch(err => {
                done(err);
            })
    });

    it('should move a running module from position 1 to the end of the list', done => {
        let updates = { position: -1 };
        dbRunningModules.addModuleToRunningModules(con, moduleId, groupId, 1)
            .then(() => {
                return dbRunningModules.updateRunningModule(con, updates, groupId, 1)
                    .then(runningModules => {
                        let targetModule = runningModules[runningModules.length - 1];
                        expect(targetModule.module_id).to.be.equal(moduleId);
                        expect(targetModule.group_id).to.be.equal(groupId);
                        expect(runningModules.length).to.be.equal(runningModulesLength + 1);
                        done();
                    });
            })
            .catch(err => {
                done(err);
            })
    });

    it('should delete a running module at position 1', done => {
        dbRunningModules.addModuleToRunningModules(con, moduleId, groupId, 1)
            .then(() => {
                return dbRunningModules.deleteRunningModule(con, groupId, 1)
                    .then(runningModules => {
                        expect(runningModules[1].module_id).not.to.be.equal(moduleId);
                        expect(runningModules.length).to.be.equal(runningModulesLength);
                        done();
                    });
            })
            .catch(err => {
                done(err);
            })
    });

});