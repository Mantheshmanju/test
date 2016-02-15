"use strict";
angular.module("alwaysHiredApp")
    .directive(
    "appMenu",
    ["$location", function ($location) {
        return {
            restrict: "E",
            templateUrl: "views/directives/app-menu.html",
            link: function (scope, elem, attr) {
                scope.$location = $location;
            }
        }
    }
    ]);