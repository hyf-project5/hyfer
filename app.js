//Module dependencies.
let express = require('express');
// let routes = require('./routes');
let http = require('http');
let path = require('path');

let app = express();

// let connection  = require('express-myconnection');
// let mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 3002);

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(__dirname + '/client'))
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request
-------------------------------------------*/

// app.use(

//     connection(mysql,{

//     host: 'hykrdb.cmsfrokrxjf7.us-west-2.rds.amazonaws.com',
//     user: 'smsuser',
//     password: 'uyew65knj098',
//     database: 'smshyf'
//     },'pool') //or single

// );
app.use(require('./server/database'));

// app.use(

//     connection(mysql,{

//     host: 'localhost',
//     user: 'hasan',
//     password: 'inshallah3',
//     database: 'test'
//     },'pool') //or single

// );

require('./server')(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
