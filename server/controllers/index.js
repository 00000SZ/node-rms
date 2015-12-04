'use strict';

module.exports = function(config) {
  var fs = require('fs');
  var path = require('path');
  var controllers = {};

  fs.readdirSync(__dirname)
    .filter(function(dir) {
      return fs.statSync(path.join(__dirname, dir)).isDirectory();
    })
    .forEach(function(dir) {
      controllers[dir] = {};
      fs.readdirSync(path.join(__dirname, dir))
        .filter(function(file) {
          var filter = ['index.js'];
          return (file.indexOf('.') !== 0) && (filter.indexOf(file) < 0);
        })
        .forEach(function(file) {
          var filePath = path.join(__dirname, dir) + '/' + file;
          if (file.match(/.js$/)) {
            controllers[dir][file.split('.')[0]] = require(filePath)(config);
          }
        });
    });

  return controllers;
};
