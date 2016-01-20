var config = {
    creds: {
      bucket: 'elasticbeanstalk-us-west-2-153502733246',
      access_key: 'AKIAIW7RPKSUTMUQD6WA',
      secret_key: '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'
    }
};

var connectionTagTemplate = {
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

var basicDataTemplate = [
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
];

var educationDataTemplate = [ 
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

var workHistoryDataTemplate = [
    {
        companyName: '',
        jobTitle: '',
        jobDescription: '',
        jobSalary: '',
        jobSalaryType: '',
        startDate: null,
        endDate: null
    }
];

var connectionDataTemplate = {
    resumeLink: '',
    resumeKey:'No Resume Uploaded', 
    linkedInUrl: '',
    isVeteran: false,
    militaryDivision: 'null',
    veteranId: '',
    userTags: '',
    exposure: '',
    exposureReason: ''
};