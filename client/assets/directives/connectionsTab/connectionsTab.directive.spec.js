'use strict';

describe('Directive: connectionsTab', function () {

  // load the directive's module and view
  beforeEach(module('alwaysHiredApp'));
  beforeEach(module('assets/directives/connectionsTab/connectionsTab.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<connections-tab></connections-tab>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the connectionsTab directive');
  }));
});
