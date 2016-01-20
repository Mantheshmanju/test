'use strict';

angular.module('alwaysHiredApp')
  .service('basicInfoService',['Backand', '$http', '$localStorage', function (Backand, $http, $localStorage) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    //var deffered = $q.defer();
    var data = [];
    var basicInfoService = {};
  
    basicInfoService.getBasicInfo = function () {
        return $http({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/query/data/getBasicInfoData',
          params: {
            parameters: {
              userid: $localStorage.userId
            }
          }
        }).then(function successCallback(response) {
            var tmp = response.data[0];
            if(tmp !== undefined) {
                data = tmp;
            } else {
                data = [];
            }
            
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
      
    basicInfoService.updateBasicInfo = function (basicInfoData, id) {
          return $http ({
              method: 'PUT',
              url: Backand.getApiUrl() + '/1/objects/studentBasicInfo/' + id,
              params: {
                parameters: {
                }
              },
              data: basicInfoData
            }).then(function successCallback(response) {
                console.log(response);
                //TODO move this to controller
                data = response.data;
                

                //TODO: convert this next statement to a green message
                swal("Success!", "Basic Info Updated!", "success");
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                data = response;
                swal("Oops!", "Error occured: " + response, "error");
            });  
    };
      
    basicInfoService.submitBasicInfo = function (basicInfoData) {
          return $http ({
              method: 'POST',
              url: Backand.getApiUrl() + '/1/objects/studentBasicInfo?returnObject=true',
              params: {
                parameters: {}
              },
              data: basicInfoData
            }).then(function successCallback(response) {
                data = response.data;
                //TODO: convert this next statement to a green message
                swal("Success!", "Basic Info Updated!", "success");
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                data = response;
                swal("Oops!", "Error occured: " + response, "error");
            });  
    };
      
    basicInfoService.doesBasicInfoExist = function() {
        return $http({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/query/data/doesBasicInfoExist',
          params: {
            parameters: {
              userid: $localStorage.userId
            }
          }
        }).then(function successCallback(response) {
            data = response.data[0].result;
            
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(response);
            //for now just makr doesBiExist = null
            data = null;
            swal("Oops!", "Error occured: " + response, "error");
        });
    };
      
    
    //returns the the data coming from the api call
    basicInfoService.data = function () { return data; };
      
    return basicInfoService;
    
  }]);
