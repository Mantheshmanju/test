'use strict';

var app = angular.module('alwaysHiredApp', [
  'alwaysHiredApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'backand',
  'ngStorage'
]);

app.run(function($rootScope, $localStorage) {
    $rootScope.isLoggedIn = false; 
    $rootScope.showNav = false;
    
    if(typeof $localStorage.userToken === 'undefined') {
        //not logged in
        $rootScope.isLoggedIn = false;
    } else {
        //is logged in
        $rootScope.isLoggedIn = true;
       // window.location.href = "/dashboard";
    }
    
    $rootScope.logout = function() {
        delete $localStorage.userToken;
        delete $localStorage.userId;
        $rootScope.isLoggedIn = false;
        window.location.href = "/login";
    }
});

app.config(function($urlRouterProvider, $locationProvider, BackandProvider) {
    BackandProvider.setAppName('ahplayground');
    BackandProvider.setSignUpToken('e3175594-b5d9-4a4d-a4a2-211d475964ab');
    BackandProvider.setAnonymousToken('837dab25-3e79-4fa9-b768-6aa6c9850687');
    
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
