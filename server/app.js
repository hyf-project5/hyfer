'use strict';
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const serveStatic = require('serve-static');
const errorHandler = require('errorhandler');
const http = require('http');
const path = require('path');
const passport = require('passport');
const requestId = require('express-request-id')();
const app = express();

// all environments
app.set('port', process.env.PORT || 3002);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());
app.use(passport.initialize());
app.use(requestId);
app.use(express.static(path.resolve(__dirname, '../build')));
// app.use(serveStatic(path.join(__dirname, '..')));
app.use(serveStatic(path.join(__dirname, '../client')));

if ('development' == app.get('env')) {
    app.use(errorHandler());
}

require('./config/db')(app);
require('./routes')(app);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});