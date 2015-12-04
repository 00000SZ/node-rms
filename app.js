'use strict';

var setup = require('./server/config');
var middlewares = require('./server/middlewares')(setup.config);
var controllers = require('./server/controllers')(setup.config);
var routes = require('./server/routes')(controllers);

module.exports.app = function() {
  return setup.express(setup.config, routes, middlewares);
};
