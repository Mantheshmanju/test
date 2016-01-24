'use strict';

angular.module('alwaysHiredApp')
  .controller('LoginCtrl',  function ($scope, Backand, $rootScope, $localStorage, $http, $log) {
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
                
                
                $localStorage.userToken = token;
                
               
                //get user id
                var rtn = (function() {
                    var retrn = $http({
                      method: 'GET',
                      url: Backand.getApiUrl() + '/1/query/data/getUserIdByEmail',
                      params: {
                        parameters: {
                          email: $scope.loginusername
                        }
                      }
                    }).then(function successCallback(response) {
                        var userId = response.data[0].id;
                        $rootScope.userId = userId;
                        $localStorage.userId = userId;
                        //redirect user to dashboard
                        window.location.href = "/dashboard";
                        setTimeout(function() {
                           $('.dimmer').removeClass('active');
                        }, 200);
                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        $log.log(response);
                        swal("Oops!", "Error occured: " + response, "error");
                        
                        setTimeout(function() {
                           $('.dimmer').removeClass('active');
                        }, 200);
                    });
                    
                    return retrn;
                })();
               

                

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
