(function () {
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
                        ,
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
                    templateUrl: 'app/static/hospital.html',
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
        ];
    }
})();