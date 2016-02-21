'use strict';
//
//class NavbarController {
//  //start-non-standard
//  menu = [{
//    'title': 'Home',
//    'state': 'main'
//  }];
//
//  isCollapsed = true;
//  //end-non-standard
//
//  constructor($rootScope) {
//      
//  }
//
//}

angular.module('alwaysHiredApp')
  .controller('NavbarBetaController', function($rootScope) {
    var showNav = $rootScope.showNav;
    $('.ui.sidebar').sidebar({
        context: $('.bottom.segment'),
        onVisible: function () {


        },
        onHidden: function () {

        }
    });
         
     $('#sidebar-trigger').on('click', function() {
         $('.ui.sidebar')
          .sidebar('toggle')
        ;
     });
    
      $('.ui.dropdown').dropdown();
});
