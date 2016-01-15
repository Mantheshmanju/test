'use strict';

describe('Service: studentProfileFactory', function () {

  // load the service's module
  beforeEach(module('alwaysHiredApp'));

  // instantiate service
  var studentProfileFactory;
  beforeEach(inject(function (_studentProfileFactory_) {
    studentProfileFactory = _studentProfileFactory_;
  }));

  it('should do something', function () {
    expect(!!studentProfileFactory).toBe(true);
  });

});
