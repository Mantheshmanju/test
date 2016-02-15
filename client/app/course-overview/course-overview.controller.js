'use strict';

angular.module('alwaysHiredApp')
  .controller('CourseOverviewCtrl', function ($scope, $rootScope, courseOverviewService) {
    $scope.OVs = [];
    $rootScope.showNav = true;
    
    
    function getOverview() {
//        courseOverviewService.getOverview().then(function() {
//            var data = courseOverviewService.data(); 
//        });
        
        var data = courseOverviewService.getOverview();
        $scope.OVs = data;
        console.log(data);
    }
    
    getOverview();
  });
