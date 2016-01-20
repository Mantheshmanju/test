'use strict';

angular.module('alwaysHiredApp')
  .service('alwaysHiredService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    var data = [];
    var alwaysHiredService = {};
    
    alwaysHiredService.getFormattedYear = function(date) {
        try {
            if(date.length >= 4)
                return '\'' + date.slice(-2);
            else
                return null;
        } 
        catch (ex) {
            return null;   
        }
    };
    
    alwaysHiredService.getCompletionStatus = function(status) {
        if(status == "inProcess")
            return '(In Progress)';
        else
            return null;
    };
    
    alwaysHiredService.data = function() { return data; };
    
    return alwaysHiredService;
  });
