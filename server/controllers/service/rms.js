'use strict';

module.exports = function(config) {
  var rmsCtrl = {};

  rmsCtrl.index = function(req, res) {
    res.json(config);
  };

  return rmsCtrl;
};
