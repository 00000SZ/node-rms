'use strict';

module.exports = function(config) {
  var middlewares = {};
  var fs = require('fs');
  fs.readdirSync(__dirname)
    .filter(function(file) {
      var filter = ['index.js'];
      return (file.indexOf('.') !== 0) && (filter.indexOf(file) < 0);
    })
    .forEach(function(file) {
      if (file.match(/.js$/)) {
        middlewares[file.split('.')[0]] = require(__dirname + '/' + file)(config);
      }
    });
  return middlewares;
};
