//Module dependencies.
const express = require('express');
const routes = require('./routes');
const http = require('http');
const path = require('path');
const passport = require('passport');
const addRequestId = require('express-request-id')();
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('express-jwt');

// all environments
app.set('port', process.env.PORT || 3002);

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(cookieParser());
app.use(passport.initialize());
// app.use(jwt({
//     secret: 'hyferSecret',
//     credentialsRequired: false,
//     getToken: function fromHeaderOrQuerystring(req) {
//         if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//             console.log(req.headers.authorization.split(' ')[1]);
//             return req.headers.authorization.split(' ')[1];
//         } else if (req.query && req.query.token) {
//             return req.query.token;
//         }
//         return null;
//     }
// }));

app.use(addRequestId);
app.use(express.static(path.join(__dirname, '..')));
app.use(express.static(path.join(__dirname, '../client')));
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

require('./config/db')(app);
require('./routes')(app);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});