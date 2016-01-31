'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, $rootScope, $localStorage, mainService) {
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
        mainService.addEmailBetalist($scope.betaEmail).then(function() {
            $scope.betaEmail = '';
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
