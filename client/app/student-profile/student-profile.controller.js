'use strict';

angular.module('alwaysHiredApp')
  .controller('StudentProfileCtrl', function ($scope, $rootScope) {
    $rootScope.showNav = true;
    //defaults
    $scope.isBasicInfo = "active";
    $scope.isEducation = "disabled";
    $scope.isWorkExperience = "disabled";
    $scope.isConnections = "disabled";

    var path = window.location.pathname;
    var idx = path.split('student-profile/')[1];
    if(idx === undefined) {
        //default to basic info
    } else {
        switch(idx) {
            case 'basic-info':
                $scope.isBasicInfo = "active";
                $scope.isEducation = "link";
                $scope.isWorkExperience = "link";
                $scope.isConnections = "link";
                break;
            case 'education':
                $scope.isBasicInfo = "link";
                $scope.isEducation = "active";
                $scope.isWorkExperience = "link";
                $scope.isConnections = "link";
                break;
            case 'work-experience':
                $scope.isBasicInfo = "link";
                $scope.isEducation = "link";
                $scope.isWorkExperience = "active";
                $scope.isConnections = "link";
                break;
            case 'connections':
                $scope.isBasicInfo = "";
                $scope.isEducation = "";
                $scope.isWorkExperience = "";
                $scope.isConnections = "active";
                break;
            default:
                $scope.isBasicInfo = "active";
                $scope.isEducation = "link";
                $scope.isWorkExperience = "link";
                $scope.isConnections = "link";
                break;
        }
    }
    
    $scope.data = [
        {
            basicInfoFirstname: '',
            basicInfoLastname:  '',
            basicInfoGender: '',
            basicInfoAddress1: '',
            basicInfoAddress2: '',
            basicInfoCity: '',
            basicInfoState: '',
            basicInfoInterestedIn: '',
            basicInfoRightCareer: '',
            basicInfoSalaryRange: '',
            basicInfoCareerGoal1: '',
            basicInfoCareerGoal2: '',
            basicInfoCareerGoal3: '',
            basicInfoCareerGoal4: '',
            basicInfoNextStep: '',
            basicInfoWhyUs: '',
        }
    ]
    
    for (var i in $scope.data[0]) {
        //here we might want to get the total number of questions answered,
        //and if it the count is 16 (or 15, 14..etc) let the user continue
        $scope.$watch('data.' + i, function(newVal, oldVal){
            //this gets hit first
            console.log(oldVal + "1");
            console.log(newVal + "1");
        }, true);
    }

    $scope.goTo = function (pth) {
        //check to make sure pth isn't an active tab
        window.location.href = "/student-profile/" + pth;
    }
    
    $scope.states = states;
    
    //also write logic for displaying certain directives when a tab is active
  })
.directive('basicInfoTab', function() {
    return {
        templateUrl: "../../assets/directives/basic-info-tab.html",
        restrict: 'EA',
        scope: true,
        link: function(scope,elem,attribute){
            for (var i in scope.data[0]) {
                scope.$watch('data.' + i, function(newVal, oldVal){
                    //this gets hit second
                }, true);
            }
        }
    };
});


