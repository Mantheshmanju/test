'use strict';

describe('Service: educationService', function () {

  // load the service's module
  beforeEach(module('alwaysHiredApp'));

  // instantiate service
  var educationService;
  beforeEach(inject(function (_educationService_) {
    educationService = _educationService_;
  }));

  it('should do something', function () {
    expect(!!educationService).toBe(true);
  });

});
