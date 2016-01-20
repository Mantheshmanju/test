'use strict';

angular.module('alwaysHiredApp')
  .service('workHistoryService',['Backand', '$http', '$localStorage', function (Backand, $http, $localStorage) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var data = [];
    var workHistoryService = {};
    
    workHistoryService.getWorkHistory = function () {
        return $http ({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/query/data/getWorkHistoryData',
          params: {
            parameters: {
              userid: $localStorage.userId
            }
          }
        }).then(function successCallback(response) {
            var tmp = response.data;
            if(tmp !== undefined) {
                data = tmp;
            } else {
                data = [];
            }
            
            console.log(data);
            
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(response);
            swal("Oops!", "Error occured: " + response, "error");

            setTimeout(function() {
               $('.dimmer').removeClass('active');
            }, 200);
        });
        
    };
    
    workHistoryService.addWorkHistory = function (workHistoryData) {
        console.log(workHistoryData);
        return $http ({
          method: 'POST',
          url: Backand.getApiUrl() + '/1/objects/studentWorkHistory?returnObject=true',
          params: {
            parameters: {}
          },
          data: workHistoryData
        }).then(function successCallback(response) {
            var response = response.data[0];
            console.log(response);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(response);
            swal("Oops!", "Error occured: " + response, "error");
        });
    };
    
    workHistoryService.editWorkHistory = function (workHistoryData) {
        return $http ({
          method: 'PUT',
          url: Backand.getApiUrl() + '/1/objects/studentWorkHistory/' + workHistoryData.id,
          params: {
            parameters: {
            }
          },
          data: workHistoryData
        }).then(function successCallback(response) {
            data = response.data;
            //TODO: move this to student controller
            //getEducationInfo();
            $('.ui.modal').modal('hide');
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            data = response;
            //TODO: move this to student controller
            $('.ui.modal').modal('hide');
            swal("Oops!", "Error occured: " + response, "error");
            
        });
    };
      
    workHistoryService.removeWorkHistory = function (id) {
        return $http({
              method: 'GET',
              url: Backand.getApiUrl() + '/1/query/data/deleteWorkHistoryById',
              params: {
                parameters: {
                  workHistoryId: id
                }
              }
            }).then(function successCallback(response) {
                data = response;
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                data = response;
                swal("Oops!", "Error occured: " + response, "error");
            });

    };
    
    workHistoryService.data = function() { return data; };
      
    return workHistoryService;
}]);
