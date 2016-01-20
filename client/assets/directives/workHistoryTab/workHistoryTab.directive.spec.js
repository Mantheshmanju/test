'use strict';

describe('Directive: workHistoryTab', function () {

  // load the directive's module and view
  beforeEach(module('alwaysHiredApp'));
  beforeEach(module('assets/directives/workHistoryTab/workHistoryTab.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<work-history-tab></work-history-tab>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the workHistoryTab directive');
  }));
});
