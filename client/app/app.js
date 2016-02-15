'use strict';

var app = angular.module('alwaysHiredApp', [
  'alwaysHiredApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'com.2fdevs.videogular',
  'com.2fdevs.videogular.plugins.controls',
  'com.2fdevs.videogular.plugins.overlayplay',
  'com.2fdevs.videogular.plugins.poster',
  'uk.ac.soton.ecs.videogular.plugins.cuepoints',
  'com.2fdevs.videogular.plugins.overlayplay',
  'com.2fdevs.videogular.plugins.buffering',
  'com.2fdevs.videogular.plugins.poster',
  'com.2fdevs.videogular.plugins.dash',
  'btford.socket-io',
  'ui.router',
  'backand',
  'ngStorage',
  'ngCsv',
  '720kb.datepicker',
  'angular-progress-arc'
]);

app.run(function($rootScope, $localStorage, $q) {
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
        delete $localStorage.userRole;
        $rootScope.isLoggedIn = false;
        window.location.href = "/login";
    }
        
    setTimeout(function() {
        $('.right.menu.open').on("click",function(e){
            e.preventDefault();
            $('.ui.vertical.menu').toggle();
        });

        $('.ui.dropdown').dropdown();
    }, 1000);
});

app.config(function($urlRouterProvider, $locationProvider, BackandProvider, $httpProvider) {
    BackandProvider.setAppName('ahplayground');
    BackandProvider.setSignUpToken('e3175594-b5d9-4a4d-a4a2-211d475964ab');
    BackandProvider.setAnonymousToken('837dab25-3e79-4fa9-b768-6aa6c9850687');
    
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
