'use strict';

var fs = require('fs');

module.exports = function(config) {
  var rmsCtrl = {};

  rmsCtrl.images = function(req, res) {
    fs.readdir(config.imagePath, function(err, files) {
      if (files) {
        files = files.map(function(file) {
          return '/public/images/' + file;
        });
      } else {
        files = [];
      }
      res.json(files);
    });
  };

  return rmsCtrl;
};
