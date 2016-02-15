'use strict';

angular.module('alwaysHiredApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('custom-video-test', {
        url: '/custom-video-test',
        templateUrl: 'app/custom-video-test/custom-video-test.html',
        controller: 'CustomVideoTestCtrl'
      });
  });
