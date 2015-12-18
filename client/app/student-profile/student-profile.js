'use strict';

angular.module('alwaysHiredApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('student-profile', {
        url: '/student-profile',
        templateUrl: 'app/student-profile/student-profile.html',
        controller: 'StudentProfileCtrl'
      });
  });
