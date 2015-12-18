'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor($rootScope) {
      
  }

}

angular.module('alwaysHiredApp')
  .controller('NavbarController', NavbarController, function($rootScope) {
    console.log($rootScope.showNav);
    
});
