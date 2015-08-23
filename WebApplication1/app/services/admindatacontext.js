(function () {
    'use strict';

    var serviceId = 'admindatacontext';


    angular.module('app').factory(serviceId, ['common', admindatacontext]);

    function admindatacontext(common) {
        var $q = common.$q;
        var service = {
            CreateHospital: CreateHospital,
            UpdateHospital: UpdateHospital,
            GetHospital: GetHospital
        };

        return service;

        function CreateHospital(hospitalData) {
            return common.$http.post(common.serviceBaseURL + 'hospitals/', hospitalData);
        }

        function GetHospital(hospitalId) {
            return common.$http.get(common.serviceBaseURL + 'hospitals/' + hospitalId);
        }

        function UpdateHospital(hospitalId,hospitalData)
        {
            return common.$http.put(common.serviceBaseURL + 'hospitals/'+hospitalId, hospitalData);
        }
    }
})();