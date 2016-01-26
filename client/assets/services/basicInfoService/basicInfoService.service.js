'use strict';

angular.module('alwaysHiredApp')
  .service('basicInfoService',['Backand', '$http', '$localStorage', function (Backand, $http, $localStorage) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    //var deffered = $q.defer();
    var data = [];
    var basicInfoService = {};
      
    basicInfoService.getBasicInfo = function () {
        $('.dimmer').addClass('active');
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
            $('.dimmer').removeClass('active');
            
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
          $('.dimmer').addClass('active');
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
                
                $('.dimmer').removeClass('active');
                //TODO: convert this next statement to a green message
                swal("Success!", "Basic Info Updated!", "success");
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                data = response;
                $('.dimmer').removeClass('active');
                swal("Oops!", "Error occured: " + response, "error");
            });  
    };
      
    basicInfoService.submitBasicInfo = function (basicInfoData) {
            $('.dimmer').addClass('active');
          return $http ({
              method: 'POST',
              url: Backand.getApiUrl() + '/1/objects/studentBasicInfo?returnObject=true',
              params: {
                parameters: {}
              },
              data: basicInfoData
            }).then(function successCallback(response) {
                data = response.data;
                $('.dimmer').removeClass('active');
                //TODO: convert this next statement to a green message
                swal("Success!", "Basic Info Updated!", "success");
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                data = response;
                $('.dimmer').removeClass('active');
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
      
    basicInfoService.validateBasicInfo = function (obj) {
        var error = {
            code: 0,
            message: ''
        };
        
        //show loading
        //break address up in the following format:
        var formattedAddress1 = obj.Address1.replace(/ /g,"+");
        var formattedAddress2 = (obj.Address2 != null) ?obj.Address2.replace(/ /g,"+") : null;
            
        var address1 = formattedAddress1;
        var address2 = obj.City + '+' + obj.State; //if we add zip code, we need to add it to this var
        //validate address
        var url = 'https://crossorigin.me/http://www.yaddress.net/api/address?AddressLine1=' + address1 + '&AddressLine2=' + address2 + '&UserKey=' + config.yaddress.user_key;
        
        return $http.get(url)
        .then(function successCallback(response) {
            error.code = response.data.ErrorCode;
            error.message = response.data.ErrorMessage;
            if(error.code == 0) {
                var address = {
                    Address1: response.data.Number + ' ' + response.data.PreDir + ' ' + response.data.Street,
                    Address2: response.data.Sec + ' ' + response.data.SecNumber,
                    City: response.data.City,
                    State: response.data.State
                }
                error.data = address;
            }
            data = error;
            
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('error validating address with API');
            error.code = data.ErrorCode;
            error.message = data.ErrorMessage;
            data = error;
        });
    };
      
    
    //returns the the data coming from the api call
    basicInfoService.data = function () { return data; };
      
    return basicInfoService;
    
  }]);
