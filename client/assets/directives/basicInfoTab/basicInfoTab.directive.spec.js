'use strict';

describe('Directive: basicInfoTab', function () {

  // load the directive's module and view
  beforeEach(module('alwaysHiredApp'));
  beforeEach(module('assets/directives/basicInfoTab/basicInfoTab.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<basic-info-tab></basic-info-tab>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the basicInfoTab directive');
  }));
});
