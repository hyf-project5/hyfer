'use strict'
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: [
        'babel-polyfill',
        './client/app/app.js'
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                include: __dirname + '/client',
                query: {
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    loader: 'css-loader'
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [{
                        loader: 'url-loader',
                        options: { limit: 40000 }
                    },
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [new ExtractTextPlugin('style.css')]
}