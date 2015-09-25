(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common', '$scope', '$modal', '$location', 'userdatacontext', dashboard]);

    function dashboard(common, $scope, $modal, $location, userdatacontext) {
        debugger;
        var vm = this;

        vm.title = 'Dashboard';

        $scope.contactDetail = {};

        $scope.sendQuery = function()
        {
            debugger;
            //var details = "<p><b>Name:" + $scope.contactDetail.name + " </b></p><br/><p><b>Email:" + $scope.contactDetail.email + " </b></p><br/><p><b>Contact Number:" + $scope.contactDetail.contact + " </b></p><br/><p><b>Message:" + $scope.contactDetail.message + " </b></p>";
            userdatacontext.SendContactMessage($scope.contactDetail);
        }

        $scope.PostQuestion = function ()
        {
            debugger;

            common.queryData.question = $scope.question;

            if (localStorage.getItem("uid") == undefined)
            {
                var modalInstance = $modal.open({
                    templateUrl: 'app/dialogs/SignInModal.html',
                    controller: SignInModalInstanceCtrl,
                    resolve: {
                        logintype: function () {
                            return 1;
                        }
                    }
                });
                modalInstance.result.then(function (userLoggedIn, uname) {
                }, function (userLoggedIn, uname) {
                    //$scope.userLoggedIn = userLoggedIn;
                    $scope.getUserNameFromUID();
                });
            }
            else
            {
                $location.url('\query');
            }
        }

        activate();

        function activate() {
            //var promises = [getMessageCount(), getPeople()];
            //common.activateController(promises, controllerId)
            //    .then(function () { log('Activated Dashboard View'); });
        }
    }
})();