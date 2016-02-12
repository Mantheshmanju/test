'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, $rootScope, $localStorage, mainService, alwaysHiredService, $timeout) {
    this.$http = $http;
    this.awesomeThings = [];
      
    $scope.betaEmail = '';
      
    $('.dimmer').removeClass('active');
    $rootScope.showNav = false;
    $scope.goToRegister = function() {
        window.location.href = "/register";
    }
    
    $scope.logout = function() {
        delete $localStorage.userToken;
        delete $localStorage.userId;
        $rootScope.isLoggedIn = false;
    }
    
    //write api logic to handle email address beta list
    $scope.addEmailBetaList = function() {
        //regex email
        //^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$
        var email = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
        var regex = new RegExp(email);
        var test = regex.test($scope.betaEmail);
        if(!test) {
            $scope.emailError = 'Email is not in correct format.';
            $('.ui.error.message').show();
            $scope.betaEmail = '';
            $(".close.icon").click(function(){
              $(this).parent().hide();
            });
            $timeout(function() { 
                 $('.ui.error.message').hide();
             }, 20000);
            return false;
        }
        
        alwaysHiredService.getUsersIpAddress().then(function() {
           $scope.userData = alwaysHiredService.data(); 
            mainService.addEmailBetalist($scope.betaEmail, $scope.userData.IP, $scope.userData.ISP, $scope.userData.City, $scope.userData.Region, $scope.userData.PostalCode).then(function() {
                $scope.betaEmail = '';
            });
        });
    }

    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      socket.syncUpdates('thing', this.awesomeThings);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('alwaysHiredApp')
  .controller('MainController', MainController);

})();
