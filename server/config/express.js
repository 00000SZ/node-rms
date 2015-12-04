'use strict';

module.exports = function(config, routes, middlewares) {
  var express = require('express');
  var compression = require('compression');
  var bodyParser = require('body-parser');
  var app = express();

  // remove x-powered-by: Express header
  app.set('x-powered-by', false);

  // permit X-Forwarded-* request headers
  app.set('trust proxy', true);

  // set the app name
  app.set('name', config.name);

  // setup logging
  app.use(middlewares.logger);

  // setup gzip
  app.use(compression());

  // setup public assets
  app.use('/public', express.static(config.root + '/../client/public'));

  // setup body parser
  app.use(bodyParser.json());

  // setup routes
  app.use(routes.service);

  // setup error handlers
  app.use(middlewares.error.clientErrorHandler);

  var path = require('path');
  app.get('*', function(req, res) {
    res.sendFile(path.resolve('client/public/index.html'));
  });

  return app;
};
