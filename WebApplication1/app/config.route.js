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
        ];
    }
})();