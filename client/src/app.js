'use strict';

var angular = require('angular');

angular.module('app', [
])

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = true;
}])

angular.bootstrap(document, ['app']);
