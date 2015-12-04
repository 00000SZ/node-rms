'use strict';

module.exports.routes = function(app, controllers) {
  var router  = require('express').Router();
  var rms = controllers.service.rms;

  router.get('/', rms.index);

  app.use('/rms', router);
};
