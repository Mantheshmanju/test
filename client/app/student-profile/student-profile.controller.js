'use strict';
/*TODO: Education tab will need to be more invovled, we will have the user add in educations (max of 3) */
angular.module('alwaysHiredApp')
  .controller('StudentProfileCtrl', function ($scope, $rootScope, $http, Backand, $localStorage) {
    $rootScope.showNav = true;
    //defaults
    $scope.isBasicInfo = "active";
    $scope.isEducation = "disabled";
    $scope.isWorkExperience = "disabled";
    $scope.isConnections = "disabled";
    
    $scope.basicData = [
        {
            firstName: '',
            lastName:  '',
            Gender: '',
            Address1: '',
            Address2: '',
            City: '',
            State: '',
            interestedIndustry: '',
            willingToMove: '',
            salaryRange: '',
            careerGoals: '',
            nextCareerStep: '',
            whyAlwaysHired: '',
        }
    ]
    
    $scope.educationData = [ 
        {
            educationLevel: '',
            locationOfSchool: '',
            degreeStatus: '',
            degreeMajor: '',
            schoolName: '',
            startDate: '',
            endDate: ''
        }
    ];
    
    $scope.educations = [ 
        {
            educationLevel: 'Bachelors',
            locationOfSchool: 'test',
            degreeStatus: 'Completed',
            degreeMajor: 'Computer Science',
            schoolName: 'Harvard University',
            startDate: '2008',
            endDate: '2012'
        },
        {
            educationLevel: 'Masters',
            locationOfSchool: 'Conneticut',
            degreeStatus: 'Completed',
            degreeMajor: 'Algorithms',
            schoolName: 'Yale University',
            startDate: '2012',
            endDate: '2014'
        }
    ];
    
    //gets
    
    $scope.getFormattedYear = function(date) {
        try {
            if(date.length >= 4)
                return '\'' + date.slice(-2);
            else
                return null;
        } 
        catch (ex) {
            return null;   
        }
    }
    
    $scope.getCompletionStatus = function(status) {
        if(status == "inProcess")
            return '(In Progress)';
        else
            return null;
    }
    
    //sets
    
    $scope.addEducation = function(education) {
        console.log($scope.educationData);
        var currentEducation = $scope.educations;
        currentEducation.push($scope.educationData);
        $scope.educations = currentEducation;
        
        $scope.educationData = [ 
            {
                educationLevel: '',
                locationOfSchool: '',
                degreeStatus: '',
                degreeMajor: '',
                schoolName: '',
                startDate: '',
                endDate: ''
            }
        ];
        
        return;
        
    }
    
    function getBasicInfo() {
        var rtn = (function() {
            var retrn = $http({
              method: 'GET',
              url: Backand.getApiUrl() + '/1/query/data/getBasicInfoData',
              params: {
                parameters: {
                  userid: $localStorage.userId
                }
              }
            }).then(function successCallback(response) {
                var data = response.data[0];
                $scope.basicData = data;
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $log.log(response);
                swal("Oops!", "Error occured: " + response, "error");

                setTimeout(function() {
                   $('.dimmer').removeClass('active');
                }, 200);
            });

            return retrn;
        })();
    }

    var path = window.location.pathname;
    var idx = path.split('student-profile/')[1];
    if(idx === undefined) {
        //default to basic info
        $scope.isBasicInfo = "active";
        $scope.isEducation = "link";
        $scope.isWorkExperience = "link";
        $scope.isConnections = "link";
        //get basic info data
        getBasicInfo();
        
    } else {
        switch(idx) {
            case 'basic-info':
                $scope.isBasicInfo = "active";
                $scope.isEducation = "link";
                $scope.isWorkExperience = "link";
                $scope.isConnections = "link";
                getBasicInfo();
                
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
                //get basic info data and populate angular data
                break;
            case 'connections':
                $scope.isBasicInfo = "";
                $scope.isEducation = "";
                $scope.isWorkExperience = "";
                $scope.isConnections = "active";
                //get basic info data and populate angular data
                break;
            default:
                $scope.isBasicInfo = "active";
                $scope.isEducation = "link";
                $scope.isWorkExperience = "link";
                $scope.isConnections = "link";
                //get basic info data and populate angular data
                break;
        }
    }
    

    
    for (var i in $scope.basicData[0]) {
        //here we might want to get the total number of questions answered,
        //and if it the count is 16 (or 15, 14..etc) let the user continue
        $scope.$watch('basicData.' + i, function(newVal, oldVal){
            //this gets hit first
        }, true);
    }

    $scope.goTo = function (pth) {
        //check to make sure pth isn't an active tab
        window.location.href = "/student-profile/" + pth;
    }
    
    $scope.states = states;
    $scope.levels = levels;
    //also write logic for displaying certain directives when a tab is active
  })
.directive('basicInfoTab', function() {
    return {
        templateUrl: "../../assets/directives/basic-info-tab.html",
        restrict: 'EA',
        scope: true,
        link: function(scope,elem,attribute){
            for (var i in scope.basicData[0]) {
                scope.$watch('basicData.' + i, function(newVal, oldVal){
                    //this gets hit second
                }, true);
            }
        }
    };
})
.directive('educationTab', function() {
    return {
        templateUrl: "../../assets/directives/education-tab.html",
        restrict: 'EA',
        scope: true,
        link: function(scope,elem,attribute){
            for (var i in scope.educationData[0]) {
                scope.$watch('educationData.' + i, function(newVal, oldVal){
                    //this gets hit second
                }, true);
            }
        }
    };
});


