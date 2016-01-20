'use strict';

describe('Service: alwaysHiredService', function () {

  // load the service's module
  beforeEach(module('alwaysHiredApp'));

  // instantiate service
  var alwaysHiredService;
  beforeEach(inject(function (_alwaysHiredService_) {
    alwaysHiredService = _alwaysHiredService_;
  }));

  it('should do something', function () {
    expect(!!alwaysHiredService).toBe(true);
  });

});
