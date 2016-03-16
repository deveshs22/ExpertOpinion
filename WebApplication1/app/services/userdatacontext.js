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
            CreateExpertProfile: CreateExpertProfile,
            SendContactMessage: SendContactMessage,
            UpdateMailPWD: UpdateMailPWD,
            ChangePWD: ChangePWD,
            GetPaymentTransactions: GetPaymentTransactions
        };

        var usersApi = common.serviceBaseURL + 'users/';

        return service;       

        function GetUser() {
            return common.$http.get(usersApi + '0');
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

        function SendContactMessage(userInfoData) {
            return common.$http.post(usersApi + 'contact/', userInfoData);
        }

        function CreateExpertProfile(profileData)
        {
            return common.$http.post(common.serviceBaseURL + 'ExpertDetail/PostExpertDetail', profileData);
        }

        function UpdateMailPWD(email)
        {
            return common.$http.get(usersApi + 'login/fpwd/' + email + '/');
        }

        function ChangePWD(id, user)
        {
            return common.$http.put(usersApi + id, user);
        }

        function GetPaymentTransactions(isAdmin, userid)
        {
            if (isAdmin)
                return common.$http.get(common.serviceBaseURL + 'payment/');
            else
                return common.$http.get(common.serviceBaseURL + 'payment/byuser/'+userid);
        }
    }
})();