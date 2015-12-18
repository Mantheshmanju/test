'use strict';

angular.module('alwaysHiredApp')
  .controller('StudentProfileCtrl', function ($scope, $rootScope) {
    $rootScope.showNav = true;
    //this will need to be involved, we need to check where the user is at in their profile and navigate      them to the correct tab. ie. if basic info is complete, automatically set the tab to the next tab at      which a field is incomplete.
    
    //also write logic for displaying certain directives when a tab is active
  });
