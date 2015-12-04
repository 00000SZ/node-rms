'use strict';

module.exports = function(controllers) {
  var express = require('express');
  var fs = require('fs');
  var path = require('path');
  var routes = {};

  fs.readdirSync(__dirname)
    .filter(function(dir) {
      return fs.statSync(path.join(__dirname, dir)).isDirectory();
    })
    .forEach(function(dir) {
      var router = new express.Router();
      fs.readdirSync(path.join(__dirname, dir))
        .filter(function(file) {
          var filter = ['index.js'];
          return (file.indexOf('.') !== 0) && (filter.indexOf(file) < 0);
        })
        .forEach(function(file) {
          var filePath = path.join(__dirname, dir) + '/' + file;
          if (file.match(/.js$/)) {
            require(filePath).routes(router, controllers);
          }
        });
      routes[dir] = router;
    });

  return routes;
};
