'use strict';

angular.module('alwaysHiredApp')
  .service('mainService',['Backand', '$http', '$localStorage', '$timeout', function (Backand, $http, $localStorage, $timeout) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    var data = [];
    var mainService = {};
    
    mainService.addEmailBetalist = function(email, IP, ISP, City, Region, PostalCode) {
        $('.dimmer').addClass('active');
        
        var createdOn = new moment().format("MM/DD/YYYY HH:mm"),
            createdOn = new moment(createdOn).toDate();
        
        var emailObj = {
            email: email,
            IP: IP,
            ISP: ISP,
            City: City,
            Region: Region,
            PostalCode: PostalCode,
            createdOn: createdOn
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
            //swal("", "Thanks, We'll email you soon!", "success");
            $('.ui.positive.message').show();
            
            $(".close.icon").click(function(){
              $(this).parent().hide();
            });
             $timeout(function() { 
//                 $('.ui.positive.message').addClass('hidden');
//                 $('.ui.positive.message').removeClass('visible'); 
                 $('.ui.positive.message').hide();
             }, 20000);
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
