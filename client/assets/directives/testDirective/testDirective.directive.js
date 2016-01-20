'use strict';

angular.module('alwaysHiredApp')
  .directive('testDirective', function () {
    return {
      templateUrl: 'assets/directives/testDirective/testDirective.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
