(function () {
    'use strict';

    var serviceId = 'dashboarddatacontext';
    angular.module('app').factory(serviceId, ['common', dashboarddatacontext]);

    function dashboarddatacontext(common) {
        var $q = common.$q;
        var service = {
        };

        return service;

       
    }
})();