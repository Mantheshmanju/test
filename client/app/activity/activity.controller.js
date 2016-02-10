'use strict';

angular.module('alwaysHiredApp')
  .controller('ActivityCtrl', function ($scope, $rootScope, activityService) {
    $rootScope.showNav = true;
    $scope.message = 'Hello';
    
    $scope.users = [],
    $scope.queryEmail = '';
    
    $scope.getUsers = function() {
        console.log($scope.queryEmail);
        if($scope.queryEmail == '') {
            activityService.getUsers().then(function() {
                var data = activityService.data(), 
                    formattedDate = '';
                $.each(data, function(key, value) {
                    formattedDate = new moment(value.createdOn).format("MMMM DD, YYYY");

                    if(formattedDate == 'Invalid date') formattedDate = '';

                    data[key].createdOn = formattedDate;
                });

                $scope.users = data;
                console.log(data);
            });
        }
        else {
           activityService.getUsersByEmail($scope.queryEmail).then(function() {
                var data = activityService.data(), 
                    formattedDate = '';
                $.each(data, function(key, value) {
                    formattedDate = new moment(value.createdOn).format("MMMM DD, YYYY");

                    if(formattedDate == 'Invalid date') formattedDate = '';

                    data[key].createdOn = formattedDate;
                });

                $scope.users = data;
                console.log(data);
            }); 
        }
        
    }
    
    $scope.getUsers();
  });
