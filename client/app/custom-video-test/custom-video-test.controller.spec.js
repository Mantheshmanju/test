'use strict';

describe('Controller: CustomVideoTestCtrl', function () {

  // load the controller's module
  beforeEach(module('alwaysHiredApp'));

  var CustomVideo2Ctrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CustomVideo2Ctrl = $controller('CustomVideoTestCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
