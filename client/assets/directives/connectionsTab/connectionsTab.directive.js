'use strict';

angular.module('alwaysHiredApp')
  .directive('connectionsTab', function () {
    return {
      templateUrl: 'assets/directives/connectionsTab/connectionsTab.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
