'use strict';
/*TODO: Education tab will need to be more invovled, we will have the user add in educations (max of 3) */
angular.module('alwaysHiredApp')
  .controller('StudentProfileCtrl', function ($scope, $rootScope, $http, Backand, $localStorage, basicInfoService, workHistoryService, connectionService, educationService, alwaysHiredService) {
    $rootScope.showNav = true;
    //defaults
    $scope.isBasicInfo = "active";
    $scope.isEducation = "disabled";
    $scope.isWorkExperience = "disabled";
    $scope.isConnections = "disabled";
    
    $scope.exposureOther = false;
    
    $scope.connectionsData = [];
    
    $scope.basicData = basicDataTemplate;
    
    $scope.educationData = educationDataTemplate;
    
    $scope.workHistoryData = workHistoryDataTemplate;
    
    $scope.connectionData = connectionDataTemplate;
    
    $scope.connectionTags = connectionTagTemplate;
    
    $scope.showProgress = false;
    $scope.progressText = '';
    $scope.percentDone = 0;
    
    //progress
    
    $scope.size = 50;
    $scope.progress = 0;
    $scope.strokeWidth = 50;
    $scope.stroke = '#333';
    $scope.counterClockwise = '';
    
    //end progress
    
    $scope.isVeteran = {
        name: 'No'
    };
    
    $scope.getFormattedYear = function(date) {
        return alwaysHiredService.getFormattedYear(date);
    }
    
    $scope.getCompletionStatus = function(status) {
        return alwaysHiredService.getCompletionStatus(status);
    }
    
    //this needs to go into a config file
    $scope.creds = config.creds;

    $scope.upload = function(e) {
      
      $('.ui.icon.message').fadeIn()
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
            var path = data.Location;
            //send path to db
            $scope.connectionData.resumeLink = path;
            $scope.connectionData.resumeKey = data.key;
            $scope.submitConnectionsAfterUpload();
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
        $('.ui.icon.message').fadeOut('slow', function() {
            $('.ui.upload.negative.message').fadeIn();
            setTimeout(function() {
                $('.ui.upload.negative.message').fadeOut();
            }, 1000);
        });

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
        
        //validate our data 
//        basicInfoService.validateBasicInfo(basicInfoData)
//          .then(function() {
//            var rtn = basicInfoService.data();
//            if(rtn.code != 0) {
//                swal("", "", "error");
//            }
////            //TOD: STOP SUBMIT PROCESS HERE IF GETS HIT
////            if(rtn.data === undefined) {
////              alert("validation failed");
////                return;
////            }
////            //get basic info
////            //if success
////            var validation = rtn.code;
////            if(validation.code != 0) {
////                //failed
////                
////            }
//            
//            //update our object with validated and cleaned address
//            $scope.basicData.Address1 = (rtn.data.Address1 != null) ? rtn.data.Address1 : ;
//            $scope.basicData.Address2 = rtn.data.Address2;
//            $scope.basicData.City = rtn.data.City;
//            $scope.basicData.State = rtn.data.State;
//            basicInfoData.Address1 = $scope.basicData.Address1;
//            basicInfoData.Address2 = $scope.basicData.Address2;
//            basicInfoData.City = $scope.basicData.City;
//            basicInfoData.State = $scope.basicData.State;
//        });
        
        if(doesExist) {
            //grab id from db
            var id = $scope.basicData.id;
            //update   
            basicInfoService.updateBasicInfo(basicInfoData, id).then(function() {
                var validation = basicInfoService.data();
                //get basic info
                //if success
                getBasicInfo();
            });
        } else {
            //add   
            basicInfoService.submitBasicInfo(basicInfoData)
              .then(function() {
                var rtn = basicInfoService.data();
                //get basic info
                //if success
                getBasicInfo();
            });
        }
    }
    
    $scope.submitConnectionsAfterUpload = function() {
        var unformattedConnectionData = $scope.connectionData;
        
        var doesExist = $scope.doesConnExist;
        
        var connectionData = {
            userid: $localStorage.userId,
            resumeLink: unformattedConnectionData.resumeLink,
            resumeKey: unformattedConnectionData.resumeKey,
        }
        
        return (function() {
            var id = $scope.connectionData.id;
            if(id != null) {
                connectionService.afterFileUpload(connectionData, id).then(function() {
                    //check if successful
                    var data = connectionService.data();
                    //grab connection info
                    getConnectionInfo();
                });
            }
            

        })();
    }
    
    $scope.submitConnections = function() {
        //put into abstraction function
        var unformattedConnectionData = $scope.connectionData;
        
        var veteranId = null;
        var militaryDivision = null;
        
        var isVet = $scope.isVeteran.name;
        
        if(isVet == 'Yes') {
            veteranId = unformattedConnectionData.veteranId;
            militaryDivision = unformattedConnectionData.militaryDivision;
        }
        
        var doesExist = $scope.doesConnExist;
        var exposureReason = null;
        
        if(unformattedConnectionData.exposure == 'Other') {
            exposureReason = unformattedConnectionData.exposureReason;
        } else {
            exposureReason = null;
        }
        //put into abstraction function
        
        //get data ready
        var connectionData = {
            userid: $localStorage.userId,
            resumeLink: unformattedConnectionData.resumeLink,
            resumeKey: unformattedConnectionData.resumeKey,
            linkedInUrl: unformattedConnectionData.linkedInUrl,
            isVeteran: isVet,
            militaryDivision: militaryDivision,
            veteranId: veteranId,
            userTags: null,
            exposure: unformattedConnectionData.exposure,
            exposureReason: (unformattedConnectionData.exposure == 'Other' ? unformattedConnectionData.exposureReason : null)
        }
        
        if(doesExist) {
            var id = $scope.connectionData.id;
            //update   
            connectionService.editConnection(connectionData, id).then(function() {
                //check to see if failed
                var data = connectionService.data();
                //get connection data
                getConnectionInfo();
            });
            
            
        } else {
            connectionService.addConnection(connectionData).then(function() {
                //check to see if failed
                var data = connectionService.data();
                //get connection data
                getConnectionInfo();
            });
        }
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
        
        console.log(educationData);
        //validation layer
        
        //validation layer
        
        educationService.addEducation(educationData).then(function() {
            var data = educationService.data();
            
            var currentEducation = $scope.educations;
            if(currentEducation != undefined) {
                currentEducation.push(data);
            } else {
                currentEducation = [];
                currentEducation.push(data);
            }
            
            $scope.educations = currentEducation;
            $scope.educationData = [];
            
        });
        
        return;
    }
    
    $scope.submitEditEducation = function() {
        var educationData = $scope.currentEducation;   
        
        educationService.submitEducation(educationData).then(function() {
            var data = educationService.data();
            //TODO: make sure service didn't fail
            getEducationInfo();
            $('.ui.modal').modal('hide');
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
        

    }

    $scope.removeEducation = function(educationId) { 
        educationService.removeEducation(educationId).then(function() {
            //TODO: check to make sure service didn't fail
            var data = educationService.data();
            getEducationInfo();
        });
        

    }
    
    $scope.addWorkHistory = function() {
         var workHistoryData =
        {
            userId: $localStorage.userId,
            companyName: $scope.workHistoryData.companyName,
            jobTitle: $scope.workHistoryData.jobTitle,
            jobDescription: $scope.workHistoryData.jobDescription,
            jobSalary: $scope.workHistoryData.jobSalary,
            jobSalaryType: $scope.workHistoryData.jobSalaryType,
            startDate: $scope.workHistoryData.startDate,
            endDate: $scope.workHistoryData.endDate
        };
        workHistoryService.addWorkHistory(workHistoryData).then(function() {
            var rtn = workHistoryService.data();
            $scope.workHistoryData = [];
            getWorkHistory();
        });
    }
    
    $scope.editWorkHistory = function(workHistory) {
        //workHistoryService.editWorkHistory(workHistory);
        $scope.currentWorkHistory = workHistory;
        $('.ui.modal')
            .modal({
                closeable: false,
                onApprove : function() {
                    workHistoryService.editWorkHistory($scope.currentWorkHistory);
                    return false;
                }
            })
            .modal('show')
        ;
    }
    
    $scope.submitWorkHistory = function() {
        var workHistoryData = $scope.currentWorkHistory;
        workHistoryService.editWorkHistory(workHistoryData).then(function() {
            $('.ui.modal').modal('hide');
            getWorkHistory();
        });
    }

    $scope.removeWorkHistory = function(id) {
        workHistoryService.removeWorkHistory(id).then(function() {
            var rtn = workHistoryService.data();
            console.log(rtn);
            getWorkHistory();
        });
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
    
    function getEducationInfo() {
        educationService.getEducationInfo().then(function() {
            var data = educationService.data();
            //TODO: make sure service call did not fail
            if(data.length != 0) {
                $scope.educations = data;
            } else {
                $scope.educations = [];   
            }
        });
    }
    
    function getWorkHistory() {
        workHistoryService.getWorkHistory().then(function() {
            var data = workHistoryService.data();
            console.log(data);
            if(data.length != 0) {
                $scope.workHistories = data;
            } else {
                $scope.workHistories = [];   
            }
        });
    }
    
    function getConnectionInfo() {
            connectionService.getConnectionInfo().then(function() {
                var data = connectionService.data();
                //check to see if data is successful first
                if(data === undefined) {
                    //no data yet
                } else {
                    //look for resume url
                    $scope.connectionData = data;
                    $scope.checkExposureStatus($scope.connectionData.exposure);
                    $scope.isVeteran.name = $scope.connectionData.isVeteran;
                    if(data.resumeLink == null) {
                        //dats exists but no resume
                    } else {
                        
                    } 
                }
            });
    }
    
    //gets
    function checkIfBasicConnectionsExists() {
        connectionService.doesConnectionInfoExist().then(function() {
            //check to see if it did not fail
            var data = connectionService.data();
            //set scope value
            $scope.doesConnExist = (data == 1) ? true: false;
        });
    }
    
    function getBasicInfo() {
        basicInfoService.getBasicInfo().then(function() {
            $scope.basicData = basicInfoService.data();
        });
    }
    
    function checkIfBasicInfoExists() {
        basicInfoService.doesBasicInfoExist().then(function() {
            //check to see if it did not fail
            var data = basicInfoService.data();
            //set scope value
            $scope.doesBiExist = (data == 1) ? true: false;
        });
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
                getWorkHistory();
                
                $('#jobSalary').numeric({ allowDecimal: false });
                //get basic info data and populate angular data
                break;
            case 'connections':
                $scope.isBasicInfo = "link";
                $scope.isEducation = "link";
                $scope.isWorkExperience = "link";
                $scope.isConnections = "active";
                checkIfBasicConnectionsExists();
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
    
    //this can go into rootScope
    $scope.goTo = function (pth) {
        //check to make sure pth isn't an active tab
        window.location.href = "/student-profile/" + pth;
    }
    
    $scope.states = states;
    $scope.levels = levels;
    //also write logic for displaying certain directives when a tab is active
  });