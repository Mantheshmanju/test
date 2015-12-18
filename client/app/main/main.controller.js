'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, $rootScope, $localStorage) {
    this.$http = $http;
    this.awesomeThings = [];
      
    $('.dimmer').removeClass('active');
    $rootScope.showNav = false;
    $scope.goToRegister = function() {
        window.location.href = "/register";
    }
    
    $scope.logout = function() {
        delete $localStorage.userToken;
        $rootScope.isLoggedIn = false;
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
