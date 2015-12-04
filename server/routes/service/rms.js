'use strict';

module.exports.routes = function(app, controllers) {
  var router  = require('express').Router();
  var rms = controllers.service.rms;

  router.get('/images', rms.images);

  app.use('/rms', router);
};
