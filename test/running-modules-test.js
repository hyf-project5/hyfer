/* eslint-env node, mocha */

'use strict';
const mysql = require('mysql');
const chai = require('chai');
const expect = chai.expect;
const config = require('../server/config/config');
const db = require('../server/datalayer/database');

let con;
let guestUserId;
let teacherUserId;
let firstRunningModuleId;

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
    db.execQuery(con, `UPDATE running_modules SET teacher1_id=NULL, teacher2_id=NULL`)
        .then(() => {
            return db.execQuery(con, 'INSERT INTO users SET ?', {
                    username: 'guest-user',
                    role: 'guest'
                })
                .then(result => {
                    guestUserId = result.insertId;
                    return db.execQuery(con, 'INSERT INTO users SET ?', {
                            username: 'teacher-user',
                            role: 'teacher'
                        })
                        .then(result => {
                            teacherUserId = result.insertId;
                            return db.execQuery(con, `SELECT id FROM groups WHERE group_name = 'Class 5'`)
                                .then(rows => {
                                    let groupId = rows[0].id;
                                    return db.execQuery(con, 'SELECT id FROM running_modules WHERE group_id=?', [groupId])
                                        .then(runningModules => {
                                            firstRunningModuleId = runningModules[0].id;
                                            done();
                                        });
                                });
                        });
                });
        })
        .catch(err => done(err));
});

afterEach(done => {
    db.execQuery(con, `UPDATE running_modules SET teacher1_id=NULL, teacher2_id=NULL`)
        .then(() => db.execQuery(con, 'DELETE FROM users WHERE id=?', [guestUserId]))
        .then(() => db.execQuery(con, 'DELETE FROM users WHERE id=?', [teacherUserId]))
        .then(() => done())
        .catch(err => done(err))
});

describe('running modules', () => {

    it('should reject an attempt to assign a non-teacher to a running module', done => {
        db.execQuery(con, 'UPDATE running_modules SET teacher1_id=? WHERE id=?', [guestUserId, firstRunningModuleId])
            .then(() => {
                done(new Error('update should be rejected'));
            })
            .catch(err => {
                expect(err).to.not.be.undefined;
                done();
            });
    });

    it('should accept an attempt to assign a teacher to a running module', done => {
        db.execQuery(con, 'UPDATE running_modules SET teacher1_id=? WHERE id=?', [teacherUserId, firstRunningModuleId])
            .then(() => done())
            .catch(err => done(err));
    });
});