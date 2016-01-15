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
      
    
    //returns the the data coming from the api call
    basicInfoService.data = function () { return data; };
      
    return basicInfoService;
    
  }]);
