'use strict';

angular.module('alwaysHiredApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('course-overview', {
        url: '/course-overview',
        templateUrl: 'app/course-overview/course-overview.html',
        controller: 'CourseOverviewCtrl'
      });
  });
