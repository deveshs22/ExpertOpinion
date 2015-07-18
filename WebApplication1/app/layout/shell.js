(function () { 
    'use strict';
    
    var controllerId = 'shell';
    angular.module('app').controller(controllerId,
        ['$scope', '$rootScope', '$modal','$location', 'common', 'config', 'userdatacontext', shell]);

    function shell($scope, $rootScope, $modal, $location, common, config, userdatacontext) {
        var vm = this;
        var logSuccess = common.logger.getLogFn(controllerId, 'success');
        //var events = config.events;
        //vm.busyMessage = 'Please wait ...';
        //vm.isBusy = true;
        //vm.spinnerOptions = {
        //    radius: 40,
        //    lines: 7,
        //    length: 0,
        //    width: 30,
        //    speed: 1.7,
        //    corners: 1.0,
        //    trail: 100,
        //    color: '#F58A00'
        //};
        
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
            //debugger;
            if (localStorage.getItem("uid") != undefined) {

                userdatacontext.GetUserLoginbyUID(localStorage.getItem("uid")).success(function (result) {
                    if (result != "" && result != "null" && result != null && result != undefined)
                        $scope.UserName = result.Name.replace('"', '').replace('"', '');
                    $scope.userLoggedIn = true;
                    $scope.UserTypeId = result.UserTypeId;
                    if (result.UserTypeId == 2) {
              //          debugger;
                        $location.url('/expertdashboard');
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

        //function toggleSpinner(on) { vm.isBusy = on; }

        //$rootScope.$on('$routeChangeStart',
        //    function (event, next, current) { toggleSpinner(true); }
        //);
        
        //$rootScope.$on(events.controllerActivateSuccess,
        //    function (data) { toggleSpinner(false); }
        //);

        //$rootScope.$on(events.spinnerToggle,
        //    function (data) { toggleSpinner(data.show); }
        //);

        $scope.SignOut = function ()
        {
            localStorage.removeItem("uid");
            $scope.userLoggedIn = false;
            $scope.UserName = '';
            $location.url('/');
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
    };
})();