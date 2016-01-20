'use strict';

angular.module('alwaysHiredApp')
  .directive('workHistoryTab', function () {
    return {
      templateUrl: 'assets/directives/workHistoryTab/workHistoryTab.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
