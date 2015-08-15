(function () {
    'use strict';

    var serviceId = 'masterdatacontext';

    angular.module('app').factory(serviceId, ['common', masterdatacontext]);

    function masterdatacontext(common) {
        var $q = common.$q;
        var service = {
            GetCountryList: GetCountryList,
            GetStateList: GetStateList,
            GetCityList: GetCityList,
            GetSpecialities:GetSpecialities,
            GetExperts: GetExperts,
            GetHospitalSpecialities: GetHospitalSpecialities,
            GetHospitalList: GetHospitalList,
            uploadFile: uploadFile
        };

        return service;       

        function GetExperts()
        {
            return common.$http.get(usersApi + 'experts');
        }

        function GetSpecialities() {
            return common.$http.get(common.serviceBaseURL + 'Speciality/');
        }

        function GetHospitalSpecialities()
        {
            return common.$http.get(common.serviceBaseURL + 'hospitalspecialities/');
        }

        function uploadFile(files, filename) {
            var fd = new FormData();
            fd.append("file", files[0]);
            return common.$http.post(common.serviceBaseURL + 'upload/PostFormData?filename=' + filename, fd, {
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            })
        };

        function GetCountryList() {
            return common.$http.get(common.serviceBaseURL + 'countries');
        }

        function GetStateList(countryId) {
            return common.$http.get(common.serviceBaseURL + 'states/bycountry/' + countryId);
        }

        function GetCityList(stateId) {
            return common.$http.get(common.serviceBaseURL + 'cities/bystate/' + stateId);
        }

        function GetHospitalList()
        {
            return common.$http.get(common.serviceBaseURL + 'hospitals');
        }
    }
})();