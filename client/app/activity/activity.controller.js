'use strict';

angular.module('alwaysHiredApp')
  .controller('ActivityCtrl', function ($scope, $rootScope, activityService) {
    $rootScope.showNav = true;
    $scope.message = 'Hello';
    $scope.users = [],
    $scope.queryEmail = '';
    $scope.gMapsApikey = 'AIzaSyAMLZPkjUWxubCECstGES7htMVpdqsSTrI';
    $scope.gMapsValue = 'San Francisco, California';
    $scope.gMapsLat = 37.7749295; 
    $scope.gMapsLng = -122.41941550000001;
    
    $scope.expandUser = function(id) {
        for (var i = 0; i < $scope.users.length; i++) {
            if(id == $scope.users[i].id) {
                $scope.gMapsValue = $scope.users[i].City + ', ' + $scope.users[i].Region;
                var geocoder =  new google.maps.Geocoder();
                geocoder.geocode( { 'address': $scope.gMapsValue}, function(results, status) {
                      if (status == google.maps.GeocoderStatus.OK) {
                          $scope.gMapsLat = results[0].geometry.location.lat();
                          $scope.gMapsLng = results[0].geometry.location.lng();
                          console.log($scope.gMapsLat + ' ' + $scope.gMapsLng);
                          initMap();
                      } else {
                        //default to SF
                        $scope.gMapsLat = 37.7749295; 
                        $scope.gMapsLng = -122.41941550000001;
                        initMap();
                      }
                });
                
            }
        }
        
        //update google maps here
    }
    
    $scope.getUsers = function() {
        if($scope.queryEmail == '') {
            activityService.getUsers().then(function() {
                var data = activityService.data(), 
                    formattedDate = '';
                $.each(data, function(key, value) {
                    formattedDate = new moment(value.createdOn).format("MMMM DD, YYYY");

                    if(formattedDate == 'Invalid date') formattedDate = '';

                    data[key].createdOn = formattedDate;
                });

                $scope.users = data;
                console.log(data);
            });
        }
        else {
           activityService.getUsersByEmail($scope.queryEmail).then(function() {
                var data = activityService.data(), 
                    formattedDate = '';
                $.each(data, function(key, value) {
                    formattedDate = new moment(value.createdOn).format("MMMM DD, YYYY");

                    if(formattedDate == 'Invalid date') formattedDate = '';

                    data[key].createdOn = formattedDate;
                });

                $scope.users = data;
            }); 
        }
        
    }
    
    $scope.getUsers();
    
    var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: $scope.gMapsLat, lng: $scope.gMapsLng},
        zoom: 13
      });
        
        google.maps.event.addDomListener(window, "resize", function() {
           var center = map.getCenter();
           google.maps.event.trigger(map, "resize");
           map.setCenter(center); 
        });
    }
    
    initMap();
  });
