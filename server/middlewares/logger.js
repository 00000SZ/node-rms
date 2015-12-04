'use strict';

module.exports = function(config) {
  var logger = require('morgan');

  logger.token('user', function getId(req) {
    if (req.user && req.user.username) {
      return req.user.username;
    }
  });

  logger.token('date', function getId(req) {
    return new Date().toJSON();
  });

  return logger(':method - :date [:user] :url :status :response-time ms - :res[content-length]');
};
