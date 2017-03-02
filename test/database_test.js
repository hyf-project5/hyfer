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

   it('should get list of module ordered by seq_number', done => {
        db.getCurriculum(con, 1)
            .then(result => {
                expect(result.length).to.equal(8);
                expect(result[0].seq_number).to.equal(1000);
                done();
            })
            .catch(err => done(err));
    });

});