'use strict';

describe('Controller: CourseOverviewCtrl', function () {

  // load the controller's module
  beforeEach(module('alwaysHiredApp'));

  var CourseOverviewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CourseOverviewCtrl = $controller('CourseOverviewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
