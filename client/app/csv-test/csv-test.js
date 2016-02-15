'use strict';

angular.module('alwaysHiredApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('csv-test', {
        url: '/csv-test',
        templateUrl: 'app/csv-test/csv-test.html',
        controller: 'CsvTestCtrl'
      });
  });
