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
            GetUserNamebyUID: GetUserNamebyUID
        };

        return service;

        function GetUser() {
            return common.$http.get(common.serviceBaseURL + 'User/GetUser/0');
        }

        function GetUserLogin(email, pwd) {
            return common.$http.get(common.serviceBaseURL + 'User/GetUserLogin/'+pwd+','+email+'/');
        }

        function GetUserLoginbyEmail(email) {
            return common.$http.get(common.serviceBaseURL + 'User/GetUserLoginbyEmail/' + email);
        }

        function GetUserLoginbyUID(uid) {
            return common.$http.get(common.serviceBaseURL + 'User/GetUserLoginbyUID/' + uid);
        }

        function GetUserNamebyUID(uid) {
            return common.$http.get(common.serviceBaseURL + 'User/GetUserNamebyUID/' + uid);
        }

        function CreateUser(userInfoData) {
            return common.$http.post(common.serviceBaseURL + 'User/PostUser', userInfoData);
        }
    }
})();