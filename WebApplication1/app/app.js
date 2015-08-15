(function () {
    'use strict';
    
    var roles = {
        User: 1,
        Expert: 2
    };

    var routeForUnauthorizedAccess = '/dashboard';

    var app = angular.module('app', [
        // Angular modules 
        'ngAnimate',        // animations
        'ngRoute',          // routing
        'ngSanitize',       // sanitizes html bindings (ex: sidebar.js)

        // Custom modules 
        'common',           // common functions, logger, spinner
        'common.bootstrap', // bootstrap dialog wrapper functions

        // 3rd Party Modules
        'ui.bootstrap'      // ui-bootstrap (ex: carousel, pagination, dialog)
    ]);

    jQuery.browser = {};
    (function () {
        jQuery.browser.msie = false;
        jQuery.browser.version = 0;
        if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
            jQuery.browser.msie = true;
            jQuery.browser.version = RegExp.$1;
        }
    })();

    app.directive('chosen', function () {
        var linker = function (scope, element, attrs) {
            var list = attrs['chosen'];

            scope.$watch(list, function () {
                element.trigger('liszt:updated');
                element.trigger("chosen:updated");
            });

            element.chosen();
        };

        return {
            restrict: 'A',
            link: linker
        }
    })

    
    // Handle routing errors and success events
    app.run(['$route',  function ($route) {
            // Include $route to kick start the router.
        }]);        
})();