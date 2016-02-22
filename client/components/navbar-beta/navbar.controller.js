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
    
    $('.browse.item')
    .popup({
        inline   : true,
        hoverable: false,
        position : 'bottom right',
        delay: {
          show: 300,
          hide: 800
        }
    });
    
     $('.ui.dropdown').dropdown();
});
