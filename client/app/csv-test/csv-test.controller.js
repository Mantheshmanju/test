'use strict';

angular.module('alwaysHiredApp')
  .controller('CsvTestCtrl', function ($scope) {
    $scope.message = 'Hello';
    
    $scope.a = {
        test1: 'default.a.test1',
        test2: 'default.a.test2'
    }
    
    $scope.b = {
        test1: 'default.b.test1',
        test2: 'default.b.test2'
    }
        
    $scope.c = {
        test1: 'default.c.test1',
        test2: 'default.c.test2'
    }
    
    $scope.getArray = function() {
        return [{test1: $scope.a.test1, test2:  $scope.a.test2}, {test1: $scope.b.test1, test2:  $scope.b.test2}, {test1: $scope.c.test1, test2:  $scope.c.test2}];   
    }
  });
