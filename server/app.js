'use strict'
const http = require('http')
const path = require('path')
const app = require('express')()
const bodyParser = require('body-parser')

app.set('port', process.env.PORT || 3002)
app.set('docRoot', path.resolve(__dirname, '../build'))

app.use(require('compression')())
app.use(require('morgan')('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('method-override')())
app.use(require('cookie-parser')())
app.use(require('passport').initialize())
app.use(require('serve-static')(app.get('docRoot')))

if (app.get('env') === 'development') {
  app.use(require('errorhandler')())
}

require('./config/db')(app)
require('./routes')(app)

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})
