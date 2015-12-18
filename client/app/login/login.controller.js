'use strict';

angular.module('alwaysHiredApp')
  .controller('LoginCtrl',  function ($scope, Backand, $rootScope, $localStorage) {
    $scope.message = 'Hello';
    $rootScope.showNav = true;
    
    $scope.toggleHelpMessage = function() {
        var isDisplayed = $('.helpmessage').css('display') == 'block';
        
        if(isDisplayed) {
            $('.helpmessage').fadeOut(500);
        } else {
            $('.helpmessage').fadeIn(500);
        }
    }
    
    $scope.login = function() {
        $('.dimmer').addClass('active');
        $scope.formerror = [];
        
        Backand.signin($scope.loginusername, sha256_digest($scope.loginpassword), "ahplayground").then(
           function (token) {
                $('.positive').show();

                $rootScope.isLoggedIn = true;
                $rootScope.showNav = true;
               
                $('.positive').fadeOut('slow');
                //redirect user to dashboard
                window.location.href = "/dashboard";
                $localStorage.userToken = token;
                setTimeout(function() {
                   $('.dimmer').removeClass('active');
                }, 200);
                

            }, 
            function (data, status, headers, config)  {
                $('.error').fadeIn(500);
                $scope.formerror.push(data.error_description);
                $('.dimmer').removeClass('active');
            }
        );
    }
    
    $scope.requestResetPassword = function() {
        //get email from user
        swal({    title: "Request New Password",   
                  text: "What's the email you want to reset the password for?",   
                  type: "input",                          
                  showCancelButton: true,   
                  closeOnConfirm: false,   
                  animation: "slide-from-top",
                  confirmButtonColor: "#009c95",
                  inputPlaceholder: "Email" }, 
            function(inputValue){   
                if (inputValue === false) return false;      
                if (inputValue === "") {     
                    swal.showInputError("You need to write something!");     
                    return false   
                }
                initiateRequestPassword(inputValue);
            });
        
        var initiateRequestPassword = function(email) {
              var rtn =  $http({
              method: 'GET',
              url: Backand.getApiUrl() + '/1/objects/action/backandUsers/',
              params: {
                name: 'requestResetPassword',
                parameters: {
                    email: email
                }
              }
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $log.log(response);
                if(response.statusText == "OK") {
                    swal("New password sent", "Check your inbox!", "success");
                } else {
                    swal("Oops!", "Password request failed! Make sure you have the correct email address. Try again!", "error");
                }
              }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $log.log(response);
              });
            }
    }
  });
