'use strict';

angular.module('alwaysHiredApp')
  .controller('DashboardCtrl', function ($scope, $rootScope, $localStorage, alwaysHiredService) {

    $rootScope.showNav = true;
    $scope.progress = 100;
    
    $('.card .dimmer')
        .dimmer({
          on: 'hover'
        })
    ;
    

    function getProfileProgress() {
        alwaysHiredService.getProfileProgress().then(function() {
            var data = alwaysHiredService.data();
            var progress = Math.ceil(Math.round(data.PercentageCount * 100)/5)*5;
            if(progress > 100) progress = 100;
            $scope.progress = progress;
        });
    }
    
    getProfileProgress();
    //get user information
    //check to see if they have completely filled out their profile.
    //get progress on completion, and display at as a percentage
  });