'use strict';

angular.module('alwaysHiredApp')
  .service('alwaysHiredService', function ($localStorage, $http, Backand) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    var data = [];
    var alwaysHiredService = {};
    
    alwaysHiredService.getUsersIpAddress = function () {
//      $.get("http://ipinfo.io", function(response) {
//    alert(response.ip);
//}, "jsonp");  
        
        var service = $http ({
          method: 'GET',
          url: 'http://ipinfo.io',
          params: {
            parameters: {
            }
          }
        }).then(function successCallback(response) {
            //if response.data is empty, this should mean there is no access level with this user,
            //we might want to update this user in our db to a 'Need Review' status to figure out why they
            //do not have a role.
            data = {
                IP: response.data.ip,
                ISP: response.data.org,
                City: response.data.city,
                Region: response.data.region,
                PostalCode: response.data.postal
            };
        }); 
        
        return service;
    };
    
    alwaysHiredService.getProfileProgress = function() {
            var output = '',
                service = $http ({
                  method: 'GET',
                  url: Backand.getApiUrl() + '/1/query/data/getProfileProgress',
                  params: {
                    parameters: {
                      userid: $localStorage.userId
                    }
                  }
                }).then(function successCallback(response) {
                    //if response.data is empty, this should mean there is no access level with this user,
                    //we might want to update this user in our db to a 'Need Review' status to figure out why they
                    //do not have a role.
                
                    data = response.data[0];
                    data.IsSuccess = response.status == 200;
                }); 
        
            return service;
    };
    
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
    
    alwaysHiredService.getUserAccess = function() {
        var id = $localStorage.userId;
        var role = '';
        
        if(id === undefined) {
            data = '*';   
        } else {
            //1/query/data/checkUserAccess
            var userAccessData = {
                  
            }
            
            try {
                return $http ({
                  method: 'GET',
                  url: Backand.getApiUrl() + '/1/query/data/checkUserAccess',
                  params: {
                    parameters: {
                        userid: id 
                    }
                  }
                }).then(function successCallback(response) {
                    //if response.data is empty, this should mean there is no access level with this user,
                    //we might want to update this user in our db to a 'Need Review' status to figure out why they
                    //do not have a role.
                
                    data = response.data[0].userRole;               
                });
            } catch(ex) {
                console.log(ex);
                data = '*';
            }
        }
    };
    
    alwaysHiredService.data = function() { return data; };
    
    return alwaysHiredService;
  });
