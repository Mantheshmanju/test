'use strict';

angular.module('alwaysHiredApp')
  .service('mainService',['Backand', '$http', '$localStorage', function (Backand, $http, $localStorage) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    var data = [];
    var mainService = {};
    
    mainService.addEmailBetalist = function(email) {
        $('.dimmer').addClass('active');
        
        var emailObj = {
            email: email
        };
        
        return $http ({
          method: 'POST',
          url: Backand.getApiUrl() + '/1/objects/emailCampaignBeta',
          params: {
            parameters: {
            }
          },
          data: emailObj
        }).then(function successCallback(response) {
            data = response.data;
            $('.dimmer').removeClass('active');
            swal("", "Thanks, We'll email you soon!", "success");
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            data = response;
            console.log(data);
            swal("", response.data, "error");
            $('.dimmer').removeClass('active');            
        }); 
    };
    
    mainService.data = function() {
      return data;  
    };
    return mainService;
  }]);
