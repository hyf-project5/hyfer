'use strict';
const mysql = require('mysql');
const chai = require('chai');
const expect = chai.expect;
const config = require('../server/config/config')
const db = require('../server/database/database');

let con;

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
})

describe('User stories - User', () => {

    it('should get timeline data for a specific group', done => {
        db.getTimelineForGroup(con, 1)
            .then(() => done())
            .catch(err => done(err));
    });

});