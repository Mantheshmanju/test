'use strict';

angular.module('alwaysHiredApp')
  .config(function ($stateProvider) {
    
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      });
  });
