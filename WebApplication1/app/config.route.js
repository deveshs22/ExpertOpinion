﻿(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());

    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            },
                        {
                            url: '/query',
                            config: {
                                templateUrl: 'app/query/query.html',
                                title: 'Query',
                                settings: {
                                    nav: 1,
                                    content: '<i class="fa fa-dashboard"></i> Dashboard'
                                }
                            }
                        },
                        {
                            url: '/questions',
                            config: {
                                templateUrl: 'app/dashboard/questions.html',
                                title: 'Payment',
                                settings: {
                                    nav: 1,
                                    content: '<i class="fa fa-dashboard"></i> Dashboard'
                                }
                            }
                        }
                        ,
                        {
                            url: '/userquestionsubmit',
                            config: {
                                templateUrl: 'app/dashboard/userquestionsubmit.html',
                                title: 'Payment',
                                settings: {
                                    nav: 1,
                                    content: '<i class="fa fa-dashboard"></i> Dashboard'
                                }
                            }
                        }
                        ,
                        {
                            url: '/userquestions',
                            config: {
                                templateUrl: 'app/dashboard/userquestions.html',
                                title: 'Payment',
                                settings: {
                                    nav: 1,
                                    content: '<i class="fa fa-dashboard"></i> Dashboard'
                                }
                            }
                        },
                        {
                            url: '/admin/hospitals',
                            config: {
                                templateUrl: 'app/admin/hospitals.html',
                                title: 'Payment',
                                settings: {
                                    nav: 1,
                                    content: '<i class="fa fa-dashboard"></i> Dashboard'
                                }
                            }
                        },
                        {
                            url: '/admin/managehospitals',
                            config: {
                                templateUrl: 'app/admin/managehospitals.html',
                                title: 'Manage Hospitals',
                                settings: {
                                    nav: 1,
                                    content: '<i class="fa fa-dashboard"></i> Manage Hospitals'
                                }
                            }
                        },
                        {
                            url: '/payment',
                            config: {
                                templateUrl: 'app/query/payment.html',
                                title: 'Payment',
                                settings: {
                                    nav: 1,
                                    content: '<i class="fa fa-dashboard"></i> Dashboard'
                                }
                            }
                        },
                        ,
                        {
                            url: '/profile',
                            config: {
                                templateUrl: 'app/dashboard/profile.html',
                                title: 'Profile',
                                settings: {
                                    nav: 1,
                                    content: '<i class="fa fa-dashboard"></i> Profile'
                                }
                            }
                        }
                        ,
                        {
                            url: '/reply',
                            config: {
                                templateUrl: 'app/query/reply.html',
                                title: 'Profile',
                                settings: {
                                    nav: 1,
                                    content: '<i class="fa fa-dashboard"></i> Reply'
                                }
                            }
                        }
                        ,
                        {
                            url: '/expertdashboard',
                            config: {
                                templateUrl: 'app/dashboard/expertdashboard.html',
                                title: 'ExpertDashboard',
                                settings: {
                                    nav: 1,
                                    content: '<i class="fa fa-dashboard"></i> Expert Dashboard'
                                }
                            }
                        }
                                                ,
                        {
                            url: '/experthistory',
                            config: {
                                templateUrl: 'app/dashboard/experthistory.html',
                                title: 'ExpertHistory',
                                settings: {
                                    nav: 1,
                                    content: '<i class="fa fa-dashboard"></i> Expert History'
                                }
                            }
                        }
                        ,
                        {
                            url: '/userhistory',
                            config: {
                                templateUrl: 'app/dashboard/userhistory.html',
                                title: 'UserHistory',
                                settings: {
                                    nav: 1,
                                    content: '<i class="fa fa-dashboard"></i> User History'
                                }
                            }
                        }
                        ,
                        {
                            url: '/userpaymentreport',
                            config: {
                                templateUrl: 'app/dashboard/userpaymentreport.html',
                                title: 'UserHistory',
                                settings: {
                                    nav: 1,
                                    content: '<i class="fa fa-dashboard"></i> User Payment Report'
                                }
                            }
                        }
                        ,
                        {
                            url: '/adminpaymentreport',
                            config: {
                                templateUrl: 'app/dashboard/adminpaymentreport.html',
                                title: 'UserHistory',
                                settings: {
                                    nav: 1,
                                    content: '<i class="fa fa-dashboard"></i> Admin Payment Report'
                                }
                            }
                        }
                        ,
                        {
                            url: '/answer',
                            config: {
                                templateUrl: 'app/query/answer.html',
                                title: 'Answer',
                                settings: {
                                    nav: 1,
                                    content: '<i class="fa fa-dashboard"></i> Answer'
                                }
                            }
                        }
                                                ,
                        {
                            url: '/userdashboard',
                            config: {
                                templateUrl: 'app/dashboard/userdashboard.html',
                                title: 'UserDashboard',
                                settings: {
                                    nav: 1,
                                    content: '<i class="fa fa-dashboard"></i> User Dashboard'
                                }
                            }
                        }
                        ,
            {
                url: '/admin',
                config: {
                    title: 'admin',
                    templateUrl: 'app/admin/admin.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Admin'
                    }
                }
            }
            ,
            {
                url: '/expert',
                config: {
                    title: 'expert',
                    templateUrl: 'app/expert/expert.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Expert'
                    }
                }
            }
             ,
            {
                url: '/hospital',
                config: {
                    title: 'hospital',
                    templateUrl: 'app/expert/hospital.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Hospital'
                    }
                }
            }
             ,
            {
                url: '/aboutus',
                config: {
                    title: 'aboutus',
                    templateUrl: 'app/static/aboutus.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> About Us'
                    }
                }
            }
             ,
            {
                url: '/contactus',
                config: {
                    title: 'contactus',
                    templateUrl: 'app/static/contactus.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Contact Us'
                    }
                }
            }
            ,
            {
                url: '/terms',
                config: {
                    title: 'terms',
                    templateUrl: 'app/static/terms.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Terms & Conditions'
                    }
                }
            }
        ];
    }
})();