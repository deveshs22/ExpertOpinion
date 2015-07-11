(function () {
    'use strict';

    var serviceId = 'userdatacontext';
    

    angular.module('app').factory(serviceId, ['common', userdatacontext]);

    function userdatacontext(common) {
        var $q = common.$q;
        var service = {
            GetUser: GetUser,
            GetUserLogin: GetUserLogin,
            GetUserLoginbyEmail:GetUserLoginbyEmail,
            CreateUser: CreateUser,
            GetUserLoginbyUID: GetUserLoginbyUID,
            GetUserNamebyUID: GetUserNamebyUID,
            GetUserNamebyID:GetUserNamebyID,
            GetCountryList: GetCountryList,
            GetStateList: GetStateList,
            GetCityList: GetCityList,
            uploadFile: uploadFile,
            GetSpecialities:GetSpecialities,
            CreateExpertProfile: CreateExpertProfile
        };

        var usersApi = common.serviceBaseURL + '/users/';

        return service;       

        function GetUser() {
            return common.$http.get(usersApi + '0');
        }

        function GetExperts()
        {
            return common.$http.get(usersApi + 'experts');
        }

        function GetUserLogin(email, pwd) {
            return common.$http.get(usersApi + 'login/' + pwd+ ','+ email+ '/');
        }

        function GetUserLoginbyEmail(email) {
            return common.$http.get(usersApi + 'login/email/' + email + '/');
        }

        function GetUserLoginbyUID(uid) {
            return common.$http.get(usersApi + 'login/uid/' + uid);
        }

        function GetUserNamebyUID(uid) {
            return common.$http.get(usersApi + 'uname/uid/' + uid);
        }

        function GetUserNamebyID(id) {
            return common.$http.get(usersApi + 'uname/id/' + id);
        }

        function CreateUser(userInfoData) {
            return common.$http.post(usersApi , userInfoData);
        }

        function GetSpecialities() {
            return common.$http.get(usersApi + 'Speciality/');
        }

        function GetCountryList()
        {
            return common.$http.get(usersApi + 'Country');
        }

        function GetStateList(countryId) {
            return common.$http.get(usersApi + 'State/GetStatesbyCountry/' + countryId);
        }

        function GetCityList(stateId) {
            return common.$http.get(usersApi + 'City/GetCitiesbyState/' + stateId);
        }

        function uploadFile(files, filename) {
            var fd = new FormData();
            fd.append("file", files[0]);
            return common.$http.post(usersApi + 'upload/PostFormData?filename=' + filename, fd, {
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            })
        };

        function CreateExpertProfile(profileData)
        {
            return common.$http.post(usersApi + 'ExpertDetail/PostExpertDetail', profileData);
        }


    }
})();