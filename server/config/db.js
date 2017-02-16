'use strict';

const mysql = require('mysql');
let connection = require('express-myconnection');
const config = require('./config');
module.exports = function (app) {
  app.use(connection(mysql, {
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database
    }, 'pool') //or single
  );
};
