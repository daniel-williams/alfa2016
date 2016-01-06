/* eslint no-console: 0 */
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import React from 'react';
import bodyParser from 'body-parser';

import config from './webpack.dev.config.js';


const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);

app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    }
}));
app.use(webpackHotMiddleware(compiler));

app.use('/content', express.static('Web/content'));
app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/api/subscribe', function response(req, res) {
  console.log('subscribe:', req.body);
  res.status(200).end();
});
app.post('/api/contact', function response(req, res) {
  console.log('contact:', req.body);
  res.status(200).end();
});

app.get('*', function response(req, res) {
    res.end(renderPage());
});


function renderPage(includeFirebase) {
  return `
<!doctype html>
<html>
  <head>
    <title>Anna Lancaster Fine Art</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="/vendors.bundle.js"></script>
    <script src="/app.bundle.js"></script>
  </body>
</html>
`
}


app.listen(port, '127.0.0.1', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://127.0.0.1:%s/ in your browser.', port, port);
});
