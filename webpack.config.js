var webpack = require('webpack');
// var fs = require('fs');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],
    module: {
    //     noParse: [
    //         /^mongodb$/
    //     ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'react-hot!babel'
            },
            // {
            //     test: /\.node$/,
            //     loader: "node-loader"
            // }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/vertx/),
        new webpack.IgnorePlugin(/^kerberos$/)
    ],
    // target: "web",
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty"
    },
    // externals: fs.readdirSync("node_modules").map(function(module) {
    //     return "commonjs " + module
    // }),
};
