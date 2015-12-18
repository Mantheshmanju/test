'use strict';

angular.module('alwaysHiredApp')
  .controller('RegisterCtrl', function ($scope, $rootScope, Backand, $localStorage) {
    $scope.message = 'Hello';
    $rootScope.showNav = true;
    
    $scope.register = function() {
        var isValid = true;
        $scope.formerror = [];
        $('.error').hide();
        $('.dimmer').addClass('active');

        //validate first and last name
        if($scope.firstname.length <= 0) {
            $scope.formerror.push("First name must not be blank.");
            isValid = false;
        }
        
        if($scope.lastname.length <= 0) {
            $scope.formerror.push("First name must not be blank.");
            isValid = false;
        }
        
//        //validate username
//        var isOnlyLettersNumbers = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test($scope.email);
//        var isFirstLetterChar = /^[a-z]/i.test($scope.email);
        
//        if(!isOnlyLettersNumbers) {
//            $scope.formerror.push("Username must only contain letters and numbers.");
//            isValid = false;
//        } else if (!isFirstLetterChar) {
//            $scope.formerror.push("Username must start with a letter");
//            isValid = false;
//        }
        //validate email
        var validEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test($scope.useremail);
        if(!validEmail) {
            $scope.formerror.push("Email is not in correct format.");
            isValid = false;
        }
        //validate passwords
        ////At least 1 uppercase and lowercase letter
        ////at least 6 chars
        ////format password strength
        if($scope.userpassword.length < 6) {
            $scope.formerror.push("Password must be at least 6 characters");
            isValid = false;
        }
        
        var isUpperLowerDigit = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test($scope.userpassword);
        if(!isUpperLowerDigit) {
           $scope.formerror.push("Password must contain at least 1 uppercase, lowercase and number.");
            isValid = false;
        }
        
        if(!isValid) {
            $('.dimmer').removeClass('active')
            $('.error').show();
            return;
        } else {
            $(this)
              .closest('.message')
              .transition('fade')
            ;
        }
       
        
        //send to db
        Backand.signup($scope.firstname, $scope.lastname, $scope.useremail, sha256_digest($scope.userpassword), sha256_digest($scope.userconfirmpassword), {'userRole': "student", 'isDisabled': true })
            .then(
                function successCallback(response) {
                    console.log("Success");
                    console.log(response);
                    //$('.dimmer').removeClass('active');
                    //log user in
                    Backand.signin($scope.useremail, sha256_digest($scope.userpassword), "ahplayground")
                    .then(
                    function (token) {
                            //redirect user to dashboard
                            $rootScope.isLoggedIn = true;
                            $scope.isLoggedIn = true;
                            window.location.href = "#/";
                            $localStorage.userToken = token;

                        
                    }, 
                    function (data, status, headers, config)  {
                        console.log("error");
                        $('.error').fadeIn(500);
                        $scope.formerror.push(data.error_description);
                        $('.dimmer').removeClass('active');
                    }
                );
                    
                }, 
                function errorCallback(response) {
                    swal("success", response.statusText);
                    $('.dimmer').removeClass('active')
                }
            );
        
        //reset
        $scope.usernameError = "";
        $scope.useremailError = "";
        $scope.userpasswordError = "";
        $scope.firstNameError = "";
        $scope.lastNameError = "";
    }
  });
