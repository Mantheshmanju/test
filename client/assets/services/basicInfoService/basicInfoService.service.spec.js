'use strict';

describe('Service: basicInfoService', function () {

  // load the service's module
  beforeEach(module('alwaysHiredApp'));

  // instantiate service
  var basicInfoService;
  beforeEach(inject(function (_basicInfoService_) {
    basicInfoService = _basicInfoService_;
  }));

  it('should do something', function () {
    expect(!!basicInfoService).toBe(true);
  });

});
