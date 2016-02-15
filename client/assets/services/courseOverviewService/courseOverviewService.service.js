'use strict';

angular.module('alwaysHiredApp')
  .service('courseOverviewService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    var data = [];
    var courseOverviewService = {};
    
    courseOverviewService.getOverview = function() {
        data = [ 
                    {
                      title: 'Introduction to Sales',
                      lectures: [
                            {
                                name: 'Course Overview',
                                time: '4:00',
                                fullTime: '4:00',
                                timeRemaining: '0:00',
                                completed: true
                            },
                            {
                                name: 'Setting Up Environment',
                                time: '3:30',
                                fullTime: '3:30',
                                timeRemaining: '0:00',
                                completed: true
                            },
                            {
                                name: 'Sales Bootcamp 101',
                                time: '0:34',
                                fullTime: '2:54',
                                timeRemaining: '2:24',
                                completed: false
                            },
                            {
                                name: 'Sales Bootcamp 102',
                                time: '0:00',
                                fullTime: '2:54',
                                timeRemaining: '2:54',
                                completed: false
                           },
                           {
                                name: 'Sales Bootcamp 103',
                                time: '0:00',
                                fullTime: '2:54',
                                timeRemaining: '2:54',
                                completed: false
                           }
                          ]
                    },
                    {
                       title: 'First Things First',
                       lectures: [
                        {
                            name: 'Course Overview',
                            time: '4:00',
                            fullTime: '4:00',
                            timeRemaining: '0:00',
                            completed: true
                        },
                        {
                            name: 'Setting Up Environment',
                            time: '1:26',
                            fullTime: '3:30',
                            timeRemaining: '2:34',
                            completed: false
                        },
                        {
                            name: 'Setting Up Environment',
                            time: '0:34',
                            fullTime: '3:30',
                            timeRemaining: '2:56',
                            completed: false
                        },
                        {
                            name: 'Setting Up Environment',
                            time: '2:00',
                            fullTime: '3:30',
                            timeRemaining: '1:30',
                            completed: false
                        }
                       ]
                    }
                ];
        
        return data;
    };
    
    courseOverviewService.data = function() { return data; };
    
    return courseOverviewService;
  });
