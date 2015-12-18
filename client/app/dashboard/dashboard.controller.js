'use strict';

angular.module('alwaysHiredApp')
  .controller('DashboardCtrl', function ($scope, $rootScope) {
    $rootScope.showNav = true;
    
    $('.card .dimmer')
        .dimmer({
          on: 'hover'
        })
    ;

    //get user information
    //check to see if they have completely filled out their profile.
    //get progress on completion, and display at as a percentage
  });