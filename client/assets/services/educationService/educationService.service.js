'use strict';

angular.module('alwaysHiredApp')
  .service('educationService',['Backand', '$http', '$localStorage', function (Backand, $http, $localStorage) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    var data = [];
    var educationService = {};
    
    educationService.getEducationInfo = function() {
      $('.dimmer').addClass('active');
      return $http({
              method: 'GET',
              url: Backand.getApiUrl() + '/1/query/data/getEducationData',
              params: {
                parameters: {
                  userid: $localStorage.userId
                }
              }
            }).then(function successCallback(response) {
                data = response.data;
                $('.dimmer').removeClass('active');

            }, function errorCallback(response) {
                data = response;
                $('.dimmer').removeClass('active');
            });  
    };
      
    educationService.addEducation = function(educationData) {
        return $http ({
          method: 'POST',
          url: Backand.getApiUrl() + '/1/objects/studentEducation?returnObject=true',
          params: {
            parameters: {}
          },
          data: educationData
        }).then(function successCallback(response) {
            data = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            data = response;
            swal("Oops!", "Error occured: " + response, "error");
        });
    };
      
    educationService.removeEducation = function(educationId) {
      return $http({
              method: 'GET',
              url: Backand.getApiUrl() + '/1/query/data/deleteEducationById',
              params: {
                parameters: {
                  educationId: educationId
                }
              }
            }).then(function successCallback(response) {
                data = response.data;
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                data = response;
                swal("Oops!", "Error occured: " + response, "error");
            });  
    };
      
    educationService.submitEducation = function(educationData) {
        $('.dimmer').addClass('active');
        return $http ({
          method: 'PUT',
          url: Backand.getApiUrl() + '/1/objects/studentEducation/' + educationData.id,
          params: {
            parameters: {
            }
          },
          data: educationData
        }).then(function successCallback(response) {
            data = response.data;
            $('.dimmer').removeClass('active');
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            data = response;
            swal("Oops!", "Error occured: " + response, "error");
            $('.dimmer').removeClass('active');            
        }); 
    };
    
    educationService.data = function() { return data; };
    
    return educationService;
  }]);
