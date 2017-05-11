'use strict'
const path = require('path')
const config = require('./webpack.config')

config.output.path = path.resolve(__dirname, 'dist/public')

module.exports = config