'use strict';

describe('Service: workHistoryService', function () {

  // load the service's module
  beforeEach(module('alwaysHiredApp'));

  // instantiate service
  var workHistoryService;
  beforeEach(inject(function (_workHistoryService_) {
    workHistoryService = _workHistoryService_;
  }));

  it('should do something', function () {
    expect(!!workHistoryService).toBe(true);
  });

});
