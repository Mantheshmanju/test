'use strict';

angular.module('alwaysHiredApp')
  .directive('navbarbeta', () => ({
    templateUrl: 'components/navbar-beta/navbar.html',
    restrict: 'AE',
    controller: 'NavbarBetaController',
    controllerAs: 'nav'
  }));
