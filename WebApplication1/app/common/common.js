(function () {
    'use strict';

    // Define the common module 
    // Contains services:
    //  - common
    //  - logger
    //  - spinner
    var commonModule = angular.module('common', []);

    // Must configure the common service and set its 
    // events via the commonConfigProvider
    commonModule.provider('commonConfig', function () {
        this.config = {
            // These are the properties we need to set
            //controllerActivateSuccessEvent: '',
            //spinnerToggleEvent: ''
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    });

    commonModule.factory('common',
        ['$q', '$rootScope','$http', '$timeout', 'commonConfig', 'logger', common]);

    function common($q, $rootScope,$http, $timeout, commonConfig, logger) {
        var throttles = {};

        var service = {
            // common angular dependencies
            $broadcast: $broadcast,
            $q: $q,
            $http:$http,
            $timeout: $timeout,
            // generic
            activateController: activateController,
            createSearchThrottle: createSearchThrottle,
            debouncedThrottle: debouncedThrottle,
            isNumber: isNumber,
            logger: logger, // for accessibility
            textContains: textContains,
            getParameterByName: getParameterByName,
            getGUID:getGUID,
            //serviceBaseURL: 'http://66.219.98.58/api',  //'http://localhost:1179/api/'
            //serverURL: 'http://66.219.98.58/', //'http://localhost:1179/'
            serviceBaseURL: 'http://localhost:1179/api/',
            serverURL: 'http://localhost:1179/',
            queryData: queryData,
            dateCheck: dateCheck
        };

        return service;

        function activateController(promises, controllerId) {
            return $q.all(promises).then(function (eventArgs) {
                var data = { controllerId: controllerId };
                $broadcast(commonConfig.config.controllerActivateSuccessEvent, data);
            });
        }

        var userqueryDetail = {};

        function queryData()
        {
            return userqueryDetail;
        }

        

        function $broadcast() {
            return $rootScope.$broadcast.apply($rootScope, arguments);
        }

        function createSearchThrottle(viewmodel, list, filteredList, filter, delay) {
            // After a delay, search a viewmodel's list using 
            // a filter function, and return a filteredList.

            // custom delay or use default
            delay = +delay || 300;
            // if only vm and list parameters were passed, set others by naming convention 
            if (!filteredList) {
                // assuming list is named sessions, filteredList is filteredSessions
                filteredList = 'filtered' + list[0].toUpperCase() + list.substr(1).toLowerCase(); // string
                // filter function is named sessionFilter
                filter = list + 'Filter'; // function in string form
            }

            // create the filtering function we will call from here
            var filterFn = function () {
                // translates to ...
                // vm.filteredSessions 
                //      = vm.sessions.filter(function(item( { returns vm.sessionFilter (item) } );
                viewmodel[filteredList] = viewmodel[list].filter(function(item) {
                    return viewmodel[filter](item);
                });
            };

            return (function () {
                // Wrapped in outer IFFE so we can use closure 
                // over filterInputTimeout which references the timeout
                var filterInputTimeout;

                // return what becomes the 'applyFilter' function in the controller
                return function(searchNow) {
                    if (filterInputTimeout) {
                        $timeout.cancel(filterInputTimeout);
                        filterInputTimeout = null;
                    }
                    if (searchNow || !delay) {
                        filterFn();
                    } else {
                        filterInputTimeout = $timeout(filterFn, delay);
                    }
                };
            })();
        }

        function debouncedThrottle(key, callback, delay, immediate) {
            // Perform some action (callback) after a delay. 
            // Track the callback by key, so if the same callback 
            // is issued again, restart the delay.

            var defaultDelay = 1000;
            delay = delay || defaultDelay;
            if (throttles[key]) {
                $timeout.cancel(throttles[key]);
                throttles[key] = undefined;
            }
            if (immediate) {
                callback();
            } else {
                throttles[key] = $timeout(callback, delay);
            }
        }

        function isNumber(val) {
            // negative or positive
            return /^[-]?\d+$/.test(val);
        }

        function textContains(text, searchText) {
            return text && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
        }

        function cutString(text) {
            var wordsToCut = 5;
            var wordsArray = text.split(" ");
            if (wordsArray.length > wordsToCut) {
                var strShort = "";
                for (i = 0; i < wordsToCut; i++) {
                    strShort += wordsArray[i] + " ";
                }
                return strShort + "...";
            } else {
                return text;
            }
        };

        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(window.location);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        function dateCheck(from, to, check) {

            var fDate, lDate, cDate;
            fDate = Date.parse(from);
            lDate = Date.parse(to);
            cDate = Date.parse(check);

            if ((cDate <= lDate && cDate >= fDate)) {
                return true;
            }
            return false;
        }


        function UN() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        function getGUID() {
            var guid = (UN() + UN() + "-" + UN() + "-4" + UN().substr(0, 3) + "-" + UN() + "-" + UN() + UN() + UN()).toLowerCase();
            return guid;
        }
    }
}


)();



var ResetPasswordModalInstanceCtrl = function ($scope, $modalInstance, userdatacontext) {
    $scope.emailMessage = "";
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.IsLoading = false;
    $scope.SendResetMail = function () {
        $scope.IsLoading = true;

        userdatacontext.UpdateMailPWD($scope.email).success(function (result) {
            $scope.IsLoading = false;
            debugger;
            if (result == "null") {
                $scope.emailMessage = "Email Address is not correct.";
                return;
            }
            else {
                $scope.emailMessage = "Mail has been sent to your Email Address.";
            }
        });
    

    };
};

var ChangePasswordModalInstanceCtrl = function ($scope, $modalInstance, userdatacontext) {
    $scope.emailMessage = "";
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.IsLoading = false;
    $scope.pwd='';
    $scope.npwd='';
    $scope.SendResetMail = function () {
        $scope.IsLoading = true;
        debugger;
        userdatacontext.GetUserLoginbyUID(localStorage.getItem("uid")).success(function (result) {
            if (result != "" && result != "null" && result != null && result != undefined) {
                if (result.Pwd != $scope.pwd)
                {
                    $scope.emailMessage = 'Your current password is not matching.'
                    $scope.IsLoading = false;
                }
                else
                {
                    result.Pwd = $scope.npwd;
                    userdatacontext.ChangePWD(result.UserId, result).success(function (res) {
                        $scope.emailMessage = 'Your password has been changed.'
                        $scope.pwd = '';
                        $scope.npwd = '';
                        $scope.IsLoading = false;
                    }
                    );
                }
            }
        }
                );

    };
};


var SignInModalInstanceCtrl = function ($scope, $modal, $modalInstance, userdatacontext, logintype) {
    $scope.email = "";
    $scope.password = "";
    $scope.IsLoading = false;
    $scope.IsAdminLogin = logintype == 2;
    var id = localStorage.getItem("uid");
    $scope.login = function () {
        $scope.IsLoading = true;
        userdatacontext.GetUserLogin($scope.email, $scope.password).success(function (result) {
           if (result == "null") {
                $scope.pwdInvalid = true;
                return;
            }
            if (!result.Active) {
                $scope.Inactive = true;
                $scope.IsLoading = false;
                return;
            }
            $scope.pwdInvalid = false;
            $scope.Inactive = false;
            localStorage.setItem("uid", result.UserUniqueId);
            localStorage.setItem("id", result.UserId);
            $scope.IsLoading = false;
            $modalInstance.dismiss(true, result.Name);
        });
    }

    $scope.pwdInvalid = false;
    $scope.Inactive = false;

    $scope.cancel = function () {
        $modalInstance.dismiss(false);
    };

    $scope.openReset = function () {
        $modalInstance.dismiss(false);
        var modalInstance = $modal.open({
            templateUrl: 'app/dialogs/ResetPasswordModal.html',
            controller: ResetPasswordModalInstanceCtrl
        });
    };

    
    $scope.openSignup = function () {
        $modalInstance.dismiss(false);

        var modalInstance = $modal.open({
            templateUrl: 'app/dialogs/SignUpModal.html',
            controller: SignUpModalInstanceCtrl,
            resolve: {
                logintype: function () {
                    return logintype;
                }
            }
        })
    };
};

var SignUpModalInstanceCtrl = function ($scope, $modal, $modalInstance, userdatacontext, common, logintype) {

    $scope.IsAdminLogin = logintype == 2;

    if (logintype == 1)
        $scope.LoginType = "a Member";
    else if (logintype == 2)
        $scope.LoginType = "an Expert";
    else if (logintype == 3)
        $scope.LoginType = "an Affiliate";

    $scope.cancel = function () {
        $modalInstance.dismiss(false);
    };

    $scope.openLogin = function () {
        $modalInstance.dismiss(false);
        var modalInstance = $modal.open({
            templateUrl: 'app/dialogs/SignInModal.html',
            controller: SignInModalInstanceCtrl
        });
    };
    $scope.emailExists = false;
    $scope.userCreated = false;
    $scope.IsLoading = false;
    $scope.addUser = function () {
        if ($scope.Name != "" && $scope.Name != undefined &&
        $scope.password != "" && $scope.password != undefined &&
        $scope.email != "" && $scope.email != undefined) {
            var userInfoData = {};
            userInfoData.Name = $scope.Name;
            userInfoData.Email = $scope.email;
            userInfoData.Pwd = $scope.password;
            userInfoData.UserTypeId = logintype;
            userInfoData.UserUniqueId = common.getGUID();
            userInfoData.isActive = false;
            $scope.IsLoading = true;
            userdatacontext.CreateUser(userInfoData).success(function (result) {
                debugger;
                $scope.IsLoading = false;
                if (result == "null") {
                    $scope.emailExists = true;
                    return;
                }
                $scope.userCreated = true;
            });
        }
    };

    $scope.switchshowpwd = function () {
        debugger;
        if (document.getElementById('txtpwd').style.display != 'none') {
            $('#txtpwd').hide();
            $('#txttextpwd').show();
        }
        else {
            $('#txtpwd').show();
            $('#txttextpwd').hide();
        }
    };
};

var EmailVerifiedModalInstanceCtrl = function ($scope, $modalInstance, $location, userdatacontext, common) {
    $scope.email = common.getParameterByName("email");

    userdatacontext.GetUserLoginbyEmail($scope.email).success(function (result) {
        if (result == "null") {
            location.href = '/';
            return;
        }
        debugger;
        if (result.UserTypeId == 2)
            $scope.IsAdminLogin = true;
        localStorage.setItem("uid", result.UserUniqueId);
    });

    $scope.gotoProfile=function()
    {
        debugger;
        $modalInstance.dismiss(false);
        $location.url('\profile');
    }


    $scope.cancel = function () {
        location.href = '/';
    };

};
