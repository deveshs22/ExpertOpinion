(function () {
    'use strict';

    var serviceId = 'admindatacontext';
    

    angular.module('app').factory(serviceId, ['common', admindatacontext]);

    function admindatacontext(common) {
        var $q = common.$q;
        var service = {
            CreateHospital: CreateHospital
        };

        return service;       

        function CreateHospital(hospitalData)
        {
            return common.$http.post(common.serviceBaseURL + 'hospitals/', hospitalData);
        }
    }
})();