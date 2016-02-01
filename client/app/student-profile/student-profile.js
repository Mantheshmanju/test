'use strict';

angular.module('alwaysHiredApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('student-profile', {
        url: '/student-profile',
        templateUrl: 'app/student-profile/student-profile.html',
        controller: 'StudentProfileCtrl',
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
      })
      .state('student-profile/basic-info', {
        url: '/student-profile/basic-info',
        templateUrl: 'app/student-profile/student-profile.html',
        controller: 'StudentProfileCtrl',
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
      })
      .state('student-profile/education', {
        url: '/student-profile/education',
        templateUrl: 'app/student-profile/student-profile.html',
        controller: 'StudentProfileCtrl',
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
      })
      .state('student-profile/work-experience', {
        url: '/student-profile/work-experience',
        templateUrl: 'app/student-profile/student-profile.html',
        controller: 'StudentProfileCtrl',
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
      })
      .state('student-profile/connections', {
        url: '/student-profile/connections',
        templateUrl: 'app/student-profile/student-profile.html',
        controller: 'StudentProfileCtrl',
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
