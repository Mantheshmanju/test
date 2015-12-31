'use strict';

angular.module('alwaysHiredApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('student-profile', {
        url: '/student-profile',
        templateUrl: 'app/student-profile/student-profile.html',
        controller: 'StudentProfileCtrl'
      })
      .state('student-profile/basic-info', {
        url: '/student-profile/basic-info',
        templateUrl: 'app/student-profile/student-profile.html',
        controller: 'StudentProfileCtrl'
      })
      .state('student-profile/education', {
        url: '/student-profile/education',
        templateUrl: 'app/student-profile/student-profile.html',
        controller: 'StudentProfileCtrl'
      })
      .state('student-profile/work-experience', {
        url: '/student-profile/work-experience',
        templateUrl: 'app/student-profile/student-profile.html',
        controller: 'StudentProfileCtrl'
      })
      .state('student-profile/connections', {
        url: '/student-profile/connections',
        templateUrl: 'app/student-profile/student-profile.html',
        controller: 'StudentProfileCtrl'
      });
  });
