'use strict';

const mysql = require('mysql');
let connection = require('express-myconnection');

module.exports = function(app) {
    app.use(connection(mysql, {
            host: 'localhost',
            user: 'root',
            password: '2017',
            database: 'project'
        }, 'pool') //or single
    );
};