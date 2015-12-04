'use strict';

var angular = require('angular');

angular.module('app', [
])

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = true;
}])

.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.test = 'BLAH';
}]);

angular.bootstrap(document, ['app']);
