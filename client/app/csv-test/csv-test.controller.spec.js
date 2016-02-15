'use strict';

describe('Controller: CsvTestCtrl', function () {

  // load the controller's module
  beforeEach(module('alwaysHiredApp'));

  var CsvTestCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CsvTestCtrl = $controller('CsvTestCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
