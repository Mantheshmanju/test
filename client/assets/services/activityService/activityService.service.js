'use strict';

angular.module('alwaysHiredApp')
  .service('activityService',['Backand', '$http', '$localStorage', function (Backand, $http, $localStorage) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    var activityService = {};
    var data = [];
    
    activityService.getUsersByEmail = function(email) {
        return $http ({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/query/data/QueryEmail',
          params: {
            parameters: {
              email: email
            }
          }
        }).then(function successCallback(response) {
            data = response.data;
        }); 
    };
    
        activityService.getUsers = function() {
        return $http ({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/query/data/QueryAll',
          params: {
            parameters: {
            }
          }
        }).then(function successCallback(response) {
            data = response.data;
        }); 
    };
    
    activityService.data = function() { return data; };
    
    return activityService;
  }]);
