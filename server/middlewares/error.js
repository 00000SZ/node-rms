'use strict';

module.exports = function(config) {
  var errorHandler = {};

  errorHandler.clientErrorHandler = function(err, req, res, next) {

    if (res.statusCode === 200) {
      res.status(500);
    }
    var error = {
      status: -1,
      message: null,
    };
    if ('message' in err) {
      error.message = err.message;
    }
    if ('errors' in err) {
      error.errors = err.errors;
    }
    if (error.message === null && res.StatusCode === 404) {
      error.message = 'Not Found';
    }
    res.json(error);
  };

  return errorHandler;
};
