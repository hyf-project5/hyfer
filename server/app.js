//Module dependencies.
let express = require('express');
// let routes = require('./routes');
let http = require('http');
let path = require('path');

let app = express();

// all environments
app.set('port', process.env.PORT || 3002);

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, '..')));
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

require('./config/db')(app);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});