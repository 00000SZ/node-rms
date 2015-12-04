'use strict';

var UglifyJS = require('uglify-js');
var fs = require('fs');
var setup = require('./server/config');
var config = setup.config;

console.log("Minifying code...");

var result = UglifyJS.minify('./client/public//bundle.js', {
  compress: {
    global_defs: {
      DEBUG: false,
      NODE_ENV: config.env,
      HOST: config.host,
      INTERNAL_HOST: config.internal_host,
    }
  }
});

fs.writeFileSync('./client/public/bundle.min.js', result.code);

console.log("Minify Complete.");
