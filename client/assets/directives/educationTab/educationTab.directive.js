'use strict';

angular.module('alwaysHiredApp')
  .directive('educationTab', function () {
    return {
      templateUrl: 'assets/directives/educationTab/educationTab.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
