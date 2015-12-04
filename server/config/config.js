'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

var config = {};

config.name = 'node-rms';

config.env = process.env.NODE_ENV || 'development';
config.root = rootPath;

config.imagePath = path.normalize(rootPath + '/..' + '/client/public/images');
config.imageBaseUrl = '/public/images/';

module.exports = config;
