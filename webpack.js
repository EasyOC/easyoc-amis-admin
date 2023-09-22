const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);

app.post('/api/form', (req, res) => {
  res.json({
    status: 0,
    msg: 'success'
  });
});

app.listen(1688, function () {
  console.log('Example app listening on port 1688!\n');
});
// console.log('process.env?.npm_lifecycle_script: ', process.env);
