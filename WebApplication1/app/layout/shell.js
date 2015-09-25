(function () { 
    'use strict';
    
    var controllerId = 'shell';
    angular.module('app').controller(controllerId,
        ['$scope', '$rootScope', '$modal','$location', 'common', 'config', 'userdatacontext', shell]);

    function shell($scope, $rootScope, $modal, $location, common, config, userdatacontext) {
        var vm = this;
        var logSuccess = common.logger.getLogFn(controllerId, 'success');
        
        $scope.openEmailVeriified = function () {
            var modalInstance = $modal.open({
                templateUrl: 'app/dialogs/EmailVerified.html',
                controller: EmailVerifiedModalInstanceCtrl
            });
        };

        if (common.getParameterByName("email") != undefined && common.getParameterByName("email")!="")
        {
            $scope.openEmailVeriified();
        }

        $scope.getUserNameFromUID = function () {
            if (localStorage.getItem("uid") != undefined) {

                userdatacontext.GetUserLoginbyUID(localStorage.getItem("uid")).success(function (result) {
                    if (result != "" && result != "null" && result != null && result != undefined)
                        $scope.UserName = result.Name.replace('"', '').replace('"', '');
                    $scope.userLoggedIn = true;
                    $scope.UserTypeId = result.UserTypeId;
                    debugger;
                    if (result.UserTypeId == 2) {
                        $location.url('/expertdashboard');
                    }
                    if (result.UserTypeId == 3) {
                        $location.url('/admin');
                    }
                }
                );
            }
            return;
        }

        $scope.getUserNameFromUID();
        //activate();

        function activate() {
            logSuccess('Hot Towel Angular loaded!', null, true);
            common.activateController([], controllerId);
        }


        $scope.SignOut = function ()
        {
            localStorage.removeItem("uid");
            $scope.userLoggedIn = false;
            $scope.UserName = '';
            $location.url('/#');
        }

        $scope.openSignIn = function (logintype) {
            var modalInstance = $modal.open({
                templateUrl: 'app/dialogs/SignInModal.html',
                controller: SignInModalInstanceCtrl,
                resolve: {
                    logintype: function () {
                        return logintype;
                    }
                }
            });

            modalInstance.result.then(function (userLoggedIn,uname) {
            }, function (userLoggedIn,uname) {
                //$scope.userLoggedIn = userLoggedIn;
                $scope.getUserNameFromUID();
            });
        };

        $scope.openSignup = function (logintype) {
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
})();