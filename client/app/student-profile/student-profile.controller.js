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
    
    $scope.exposureOther = false;
    
    $scope.connectionsData = [];
    
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
    
    $scope.connectionData =
    {
        resumeLink: '',
        resumeKey:'No Resume Uploaded', 
        linkedInUrl: '',
        isVeteran: false,
        militaryDivision: 'null',
        veteranId: '',
        userTags: '',
        exposure: ''
    };
    
    $scope.connectionTags = 
    {
        RecentGrad: false,
        Veteran: false,
        RetailExp: false,
        NewToSales: false,
        Motivated: false,
        HardWorking: false,
        HereForMoney: false,
        HereForPrestige: false,
        JumpstartCareer: false,
        PeoplePlease: false,
        Persuasive: false,
        Intelligent: false,
        Analytical: false,
        Thoughtful: false,
        Introvert: false,
        Extrovert: false,
        ComfortableStrangers: false
        
    };
    
    $scope.isVeteran = {
        name: 'No'
    };
    
//    $scope.educations = [ 
//        {
//            educationLevel: 'Bachelors',
//            locationOfSchool: 'test',
//            degreeStatus: 'Completed',
//            degreeMajor: 'Computer Science',
//            schoolName: 'Harvard University',
//            startDate: '2008',
//            endDate: '2012'
//        },
//        {
//            educationLevel: 'Masters',
//            locationOfSchool: 'Conneticut',
//            degreeStatus: 'Completed',
//            degreeMajor: 'Algorithms',
//            schoolName: 'Yale University',
//            startDate: '2012',
//            endDate: '2014'
//        }
//    ];
    
    //gets
    function checkIfBasicInfoExists() {
        return (function() {
            var retrn = $http({
              method: 'GET',
              url: Backand.getApiUrl() + '/1/query/data/doesBasicInfoExist',
              params: {
                parameters: {
                  userid: $localStorage.userId
                }
              }
            }).then(function successCallback(response) {
                var value = response.data[0].result;
                $scope.doesBiExist = (value == 1) ? true: false;
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(response);
                //for now just makr doesBiExist = null
                $scope.doesBiExist = null;
                swal("Oops!", "Error occured: " + response, "error");
            });

            return retrn;
        })();
    }
    
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
    
    //uploads
            /*  Access Key ID:
            AKIAINHIO2TGRIJ3JBNQ
            Secret Access Key:
            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
        */
    $scope.creds = {
      bucket: 'elasticbeanstalk-us-west-2-153502733246',
      access_key: 'AKIAIW7RPKSUTMUQD6WA',
      secret_key: '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'
    }

    $scope.upload = function(e) {
      // Configure The S3 Object 
      AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
      AWS.config.region = 'us-east-1';
      var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
        $scope.file = e.files[0];
      if($scope.file) {
        var params = { Key: $scope.file.name, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };

        bucket.upload(params, function(err, data) {
          if(err) {
            // There Was An Error With Your S3 Config
            alert(err.message);
            return false;
          }
          else {
            // Success!
            console.log(data);
            var path = data.Location;
            //send path to db
            $scope.connectionData.resumeLink = path;
            $scope.connectionData.resumeKey = data.key;
            $scope.submitConnection();
            alert('Upload Done');
          }
        })
        .on('httpUploadProgress',function(progress) {
              // Log Progress Information
              console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
            });
      }
      else {
        // No File Selected
        alert('No File Selected');
      }
    }
    
    //end uploads
    
    //sets
    
    $scope.initUpload = function(e) {
      var photoFile = e.files[0];
      var fileData = '';
      var fileName = photoFile.name;
      var note = $localStorage.userId;
      var reader = new FileReader();
        
      reader.onload = function(e) {
          fileData = e.currentTarget.result;
          console.log(fileName, fileData, note);
          
          $http ({
          method: 'GET',
          url: Backand.getApiUrl() + '/1/objects/action/backandUsers/1',
          crossDomain: true,
          params: {
            name: 'S3FileUpload',
            parameters: {
              filename: fileName,
              filedata: fileData
            }
          }
        }).then(function successCallback(response) {
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(response);
            });
      }
      reader.readAsDataURL(photoFile);
    }
    
    $scope.submitBasicData = function() {
        //check if we exist in db yet
        var doesExist = $scope.doesBiExist;
        //get data ready
        var basicInfoData =
        {
            userId: $localStorage.userId,
            firstName: $scope.basicData.firstName,
            lastName:  $scope.basicData.lastName,
            Gender: $scope.basicData.Gender,
            Address1: $scope.basicData.Address1,
            Address2: $scope.basicData.Address2,
            City: $scope.basicData.City,
            State: $scope.basicData.State,
            interestedIndustry: $scope.basicData.interestedIndustry,
            willingToMove: $scope.basicData.willingToMove,
            salaryRange: $scope.basicData.salaryRange,
            careerGoals: null,
            nextCareerStep: $scope.basicData.nextCareerStep,
            whyAlwaysHired: $scope.basicData.whyAlwaysHired,
        };
        
        if(doesExist) {
            //grab id from db
            var id = $scope.basicData.id;
            //update   
            return $http ({
              method: 'PUT',
              url: Backand.getApiUrl() + '/1/objects/studentBasicInfo/' + id,
              params: {
                parameters: {
                }
              },
              data: basicInfoData
            }).then(function successCallback(response) {
                console.log(response);
                getBasicInfo();
                //TODO: convert this next statement to a green message
                swal("Success!", "Basic Info Updated!", "success");
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(response);
                swal("Oops!", "Error occured: " + response, "error");
            });
        } else {
            //add   
            return $http ({
              method: 'POST',
              url: Backand.getApiUrl() + '/1/objects/studentBasicInfo?returnObject=true',
              params: {
                parameters: {}
              },
              data: basicInfoData
            }).then(function successCallback(response) {
                console.log(response);
                var data = response.data;
                console.log(data);
                getBasicInfo();
                //TODO: convert this next statement to a green message
                swal("Success!", "Basic Info Updated!", "success");
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(response);
                swal("Oops!", "Error occured: " + response, "error");
            });
        }
    }
    
    $scope.submitConnection = function() {
        var unformattedConnectionData = $scope.connectionData;
        
        var connectionData = {
            userid: $localStorage.userId,
            resumeLink: unformattedConnectionData.resumeLink,
            resumeKey: unformattedConnectionData.resumeKey,
            linkedInUrl: '',
            isVeteran: false,
            militaryDivision: '',
            veteranId: '',
            userTags: '',
            exposure: ''
        }
        
        return $http ({
          method: 'POST',
          url: Backand.getApiUrl() + '/1/objects/studentConnections?returnObject=true',
          params: {
            parameters: {
            }
          },
          data: connectionData
        }).then(function successCallback(response) {
            console.log(response);
            //getConnectionData
            $('.ui.modal').modal('hide');
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(response);
            $('.ui.modal').modal('hide');
            swal("Oops!", "Error occured: " + response, "error");
            
        });
    }
    
    $scope.submitEditEducation = function() {
        var educationData = $scope.currentEducation;   
        
        return $http ({
          method: 'PUT',
          url: Backand.getApiUrl() + '/1/objects/studentEducation/' + educationData.id,
          params: {
            parameters: {
            }
          },
          data: educationData
        }).then(function successCallback(response) {
            console.log(response);
            getEducationInfo();
            $('.ui.modal').modal('hide');
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(response);
            $('.ui.modal').modal('hide');
            swal("Oops!", "Error occured: " + response, "error");
            
        });
    }
    
    $scope.editEducation = function(education) {
        $scope.currentEducation = education;
        //TODO: make edit modal and use that data to send, will also need to populate said modal with correct data.
        $('.ui.modal')
            .modal({
                closeable: false,
                onApprove : function() {
                    $scope.submitEditEducation();
                    return false;
                }
            })
            .modal('show')
        ;
        
        var educationData =
        {
            userId: $localStorage.userId,
            educationLevel: $scope.basicData.educationLevel,
            locationOfSchool: $scope.educationData.locationOfSchool,
            degreeStatus: $scope.educationData.degreeStatus,
            degreeMajor: $scope.educationData.degreeMajor,
            schoolName: $scope.educationData.schoolName,
            startDate: $scope.educationData.startDate,
            endDate: $scope.educationData.endDate
        };
        

    }

    $scope.removeEducation = function(educationId) { 
        var rtn = (function() {
            var retrn = $http({
              method: 'GET',
              url: Backand.getApiUrl() + '/1/query/data/deleteEducationById',
              params: {
                parameters: {
                  educationId: educationId
                }
              }
            }).then(function successCallback(response) {
                console.log(response);
                getEducationInfo();
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(response);
                swal("Oops!", "Error occured: " + response, "error");
            });

            return retrn;
        })();
    }

    
    $scope.addEducation = function(education) {
        var educationData =
        {
            userId: $localStorage.userId,
            educationLevel: $scope.educationData.educationLevel,
            locationOfSchool: $scope.educationData.locationOfSchool,
            degreeStatus: $scope.educationData.degreeStatus,
            degreeMajor: $scope.educationData.degreeMajor,
            schoolName: $scope.educationData.schoolName,
            startDate: $scope.educationData.startDate,
            endDate: $scope.educationData.endDate
        };
        
        return $http ({
          method: 'POST',
          url: Backand.getApiUrl() + '/1/objects/studentEducation?returnObject=true',
          params: {
            parameters: {}
          },
          data: educationData
        }).then(function successCallback(response) {
            var data = response.data[0];
            
            var currentEducation = $scope.educations;
            if(currentEducation != undefined) {
                currentEducation.push(response.data);
            } else {
                currentEducation = [];
                currentEducation.push(response.data);
            }
            
            $scope.educations = currentEducation;
            $scope.educationData = [];
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log(response);
            swal("Oops!", "Error occured: " + response, "error");
        });
        
        return;
        
    }
    
    //end set

    $scope.checkExposureStatus = function(item) {
        if(item == 'Other') {
            //show other input field
            $scope.exposureOther = true;
        } else {
           $scope.exposureOther = false; 
        }
        
    }
    
    $scope.checkVetStatus = function () {
        if($scope.isVeteran.name == 'No') {
            return true;
        } else {
            return false;
        }
        //
    }
    
    function getConnectionInfo() {
        var rtn = (function() {
            return $http ({
              method: 'GET',
              url: Backand.getApiUrl() + '/1/query/data/getConnectionData',
              params: {
                parameters: {
                  userid: $localStorage.userId
                }
              }
            }).then(function successCallback(response) {
                var data = response.data[0];
                
                if(data === undefined) {
                    //no data yet
                } else {
                    //look for resume url
                    $scope.connectionData = data;
                    if(data.resumeLink == null) {
                        //dats exists but no resume
                    } else {
                        
                    }
                }

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        })();
    }
    
    function getEducationInfo() {
        var rtn = (function() {
            var retrn = $http({
              method: 'GET',
              url: Backand.getApiUrl() + '/1/query/data/getEducationData',
              params: {
                parameters: {
                  userid: $localStorage.userId
                }
              }
            }).then(function successCallback(response) {
                var data = response.data;
                console.log(data);
                if(data.length != 0) {
                    $scope.educations = data;
                } else {
                    $scope.educations = [];   
                }
            }, function errorCallback(response) {

            });

            return retrn;
        })();
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
                console.log($localStorage.userId);
                if(data !== undefined) {
                    $scope.basicData = data;
                }
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log(response);
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
        checkIfBasicInfoExists();
        console.log($scope.doesBiExist);
        getBasicInfo();
        
    } else {
        switch(idx) {
            case 'basic-info':
                $scope.isBasicInfo = "active";
                $scope.isEducation = "link";
                $scope.isWorkExperience = "link";
                $scope.isConnections = "link";
                checkIfBasicInfoExists();
                getBasicInfo();
                
                break;
            case 'education':
                $scope.isBasicInfo = "link";
                $scope.isEducation = "active";
                $scope.isWorkExperience = "link";
                $scope.isConnections = "link";
                getEducationInfo();
                break;
            case 'work-experience':
                $scope.isBasicInfo = "link";
                $scope.isEducation = "link";
                $scope.isWorkExperience = "active";
                $scope.isConnections = "link";
                //get basic info data and populate angular data
                break;
            case 'connections':
                $scope.isBasicInfo = "link";
                $scope.isEducation = "link";
                $scope.isWorkExperience = "link";
                $scope.isConnections = "active";
                getConnectionInfo();
                //get basic info data and populate angular data
                break;
            default:
                $scope.isBasicInfo = "active";
                $scope.isEducation = "link";
                $scope.isWorkExperience = "link";
                $scope.isConnections = "link";
                //get basic info data and populate angular data
                checkIfBasicInfoExists();
                getBasicInfo();
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
})
.directive('connectionsTab', function() {
    return {
        templateUrl: "../../assets/directives/connections-tab.html",
        restrict: 'EA',
        scope: true,
        link: function(scope,elem,attribute){
            for (var i in scope.educationData[0]) {
                scope.$watch('connectionsData.' + i, function(newVal, oldVal){
                    //this gets hit second
                }, true);
            }
        }
    };
})
.directive('file', function() {
  return {
    restrict: 'AE',
    scope: {
      file: '@'
    },
    link: function(scope, el, attrs){
      el.bind('change', function(event){
          
        var files = event.target.files;
        var file = files[0];
        scope.file = file;
        scope.$parent.file = file;
        scope.$apply();
          console.log(scope.file);
      });
    }
  };
});


