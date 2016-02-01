'use strict';

angular.module('alwaysHiredApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        resolve: {
           security: ['$q', '$localStorage', function($q, $localStorage){
               var role = $localStorage.userRole;
               console.log(role);
               if(role == '*' || role === undefined){
                  window.location.href = "/";
                  return $q.reject("Not Authorized");
               }
           }]
        }
      });
  });
