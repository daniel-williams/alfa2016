var webpack = require('webpack');
var path = require('path');

var PROJECT_PATH = path.resolve(__dirname);
var NODE_MODULES = path.resolve(PROJECT_PATH, 'node_modules');

var APP_ROOT = path.resolve(PROJECT_PATH, 'app');
var WEB_ROOT = path.resolve(PROJECT_PATH, 'Web');

var DIST_PATH = path.resolve(WEB_ROOT, 'content/scripts');

module.exports = {
    entry: {
        app: [path.resolve(APP_ROOT, 'index.jsx')],
        vendors: ['react', 'react-router', 'redux', 'react-redux', 'immutable'],
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    output: {
        path: DIST_PATH,
        filename: 'app.bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.bundle.js')
    ],
};
