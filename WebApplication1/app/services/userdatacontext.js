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
            CreateExpertProfile: CreateExpertProfile
        };

        return service;

        function GetUser() {
            return common.$http.get(common.serviceBaseURL + 'User/GetUser/0');
        }

        function GetUserLogin(email, pwd) {
            return common.$http.get(common.serviceBaseURL + 'User/GetUserLogin/'+pwd+','+email+'/');
        }

        function GetUserLoginbyEmail(email) {
            return common.$http.get(common.serviceBaseURL + 'User/GetUserLoginbyEmail/' + email + '/');
        }

        function GetUserLoginbyUID(uid) {
            return common.$http.get(common.serviceBaseURL + 'User/GetUserLoginbyUID/' + uid);
        }

        function GetUserNamebyUID(uid) {
            return common.$http.get(common.serviceBaseURL + 'User/GetUserNamebyUID/' + uid);
        }

        function GetUserNamebyID(id) {
            return common.$http.get(common.serviceBaseURL + 'User/GetUserNamebyID/' + id);
        }

        function CreateUser(userInfoData) {
            return common.$http.post(common.serviceBaseURL + 'User/PostUser', userInfoData);
        }

        function GetCountryList()
        {
            return common.$http.get(common.serviceBaseURL + 'Country');
        }

        function GetStateList(countryId) {
            return common.$http.get(common.serviceBaseURL + 'State/GetStatesbyCountry/' + countryId);
        }

        function GetCityList(stateId) {
            return common.$http.get(common.serviceBaseURL + 'City/GetCitiesbyState/' + stateId);
        }

        function uploadFile(files, filename) {
            var fd = new FormData();
            fd.append("file", files[0]);
            return common.$http.post(common.serviceBaseURL + 'upload/PostFormData?filename=' + filename, fd, {
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            })
        };

        function CreateExpertProfile(profileData)
        {
            return common.$http.post(common.serviceBaseURL + 'ExpertDetail/PostExpertDetail', profileData);
        }


    }
})();