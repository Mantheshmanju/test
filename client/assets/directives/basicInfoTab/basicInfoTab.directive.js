'use strict';

angular.module('alwaysHiredApp')
  .directive('basicInfoTab', function () {
    return {
      templateUrl: 'assets/directives/basicInfoTab/basicInfoTab.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
