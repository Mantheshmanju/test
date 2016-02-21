'use strict';

angular.module('alwaysHiredApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('courses', {
        url: '/courses',
        templateUrl: 'app/courses/courses.html',
        controller: 'CoursesCtrl'
      });
  });
