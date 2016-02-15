'use strict';

describe('Service: courseOverviewService', function () {

  // load the service's module
  beforeEach(module('alwaysHiredApp'));

  // instantiate service
  var courseOverviewService;
  beforeEach(inject(function (_courseOverviewService_) {
    courseOverviewService = _courseOverviewService_;
  }));

  it('should do something', function () {
    expect(!!courseOverviewService).toBe(true);
  });

});
