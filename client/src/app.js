'use strict';

var angular = require('angular');

angular.module('app', [
])

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = true;
}])

.controller('mainCtrl', ['$scope', '$http', '$interval', function($scope, $http, $interval) {

  $scope.images = [];

  $http.get('/rms/images').then(function(data) {
    return data.data;
  }).then(function(arr) {
    // randomise the image order
    var n = arr.length;
    var tempArr = [];
    for (var i = 0; i < n - 1; i++) {
      tempArr.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
    }
    tempArr.push(arr[0]);
    return tempArr;
  }).then(function(images) {
    $scope.images = images;
    $scope.currentImage = $scope.images[0];
    loadImage($scope.currentImage);
    $interval(rotateImage, 3000);
  });

  var rotateImage = function() {
    var current = $scope.images.indexOf($scope.currentImage);
    if ((current + 2) <= $scope.images.length) {
      $scope.currentImage = $scope.images[current + 1];
    } else {
      $scope.currentImage = $scope.images[0];
    }
    loadImage($scope.currentImage);
  };

  var loadImage = function(image) {
    console.log(image);
    var a = new Image();
    a.onload = function() {
      angular.element(document.getElementById('current-image')).empty();
      angular.element(document.getElementById('current-image')).append(a);
    };
    a.onerror = function() {
    };
    a.src = image;
  };

}]);

angular.bootstrap(document, ['app']);
