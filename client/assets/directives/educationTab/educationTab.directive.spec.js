'use strict';

describe('Directive: educationTab', function () {

  // load the directive's module and view
  beforeEach(module('alwaysHiredApp'));
  beforeEach(module('assets/directives/educationTab/educationTab.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<education-tab></education-tab>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the educationTab directive');
  }));
});
