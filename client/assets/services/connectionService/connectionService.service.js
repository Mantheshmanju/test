'use strict';

angular.module('alwaysHiredApp')
  .service('connectionService',['Backand', '$http', '$localStorage', function (Backand, $http, $localStorage) {
    // AngularJS will instantiate a singleton by calling "new" on this function
      
      var data = [];
      var connectionService = {};
      
      connectionService.getConnectionInfo = function() {
        return $http ({
              method: 'GET',
              url: Backand.getApiUrl() + '/1/query/data/getConnectionData',
              params: {
                parameters: {
                  userid: $localStorage.userId
                }
              }
            }).then(function successCallback(response) {
                data = response.data[0];
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });  
      };
      
      connectionService.afterFileUpload = function(connectionData, id) {
          return $http ({
                  method: 'PUT',
                  url: Backand.getApiUrl() + '/1/objects/studentConnections/' + id,
                  params: {
                    parameters: {
                    }
                  },
                  data: connectionData
                }).then(function successCallback(response) {
                    console.log(response);
                    data = response.data;
                    //TODO: convert this next statement to a green message
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    data = response;
                    swal("Oops!", "Error occured: " + response, "error");
                });
      };
      
      connectionService.addConnection = function(connectionData) {
         return $http ({
              method: 'POST',
              url: Backand.getApiUrl() + '/1/objects/studentConnections?returnObject=true',
              params: {
                parameters: {
                }
              },
              data: connectionData
            }).then(function successCallback(response) {
                console.log(response);
                data = response.data;
                $('.ui.modal').modal('hide');
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                data = response.
                $('.ui.modal').modal('hide');
                swal("Oops!", "Error occured: " + response, "error");

            }); 
      };
      
      connectionService.editConnection = function(connectionData, id) {
          return $http ({
              method: 'PUT',
              url: Backand.getApiUrl() + '/1/objects/studentConnections/' + id,
              params: {
                parameters: {
                }
              },
              data: connectionData
            }).then(function successCallback(response) {
                console.log(response);
                data = response.data;
                //put this into controller
                
                //TODO: convert this next statement to a green message
                swal("Success!", "Connection Info Updated!", "success");
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(response);
                data = response;
                swal("Oops!", "Error occured: " + response, "error");
            });
      };
      
      connectionService.doesConnectionInfoExist = function () {
          return $http({
              method: 'GET',
              url: Backand.getApiUrl() + '/1/query/data/doesBasicConnectionsExist',
              params: {
                parameters: {
                  userid: $localStorage.userId
                }
              }
            }).then(function successCallback(response) {
                data = response.data[0].result;
                
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(response);
                //for now just makr doesConnExist = null
                data = null;
                swal("Oops!", "Error occured: " + response, "error");
            });
      };
      
      connectionService.data = function () { return data;};
      
      return connectionService;
  }]);
