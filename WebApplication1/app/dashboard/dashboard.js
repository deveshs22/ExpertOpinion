(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common', '$scope', '$modal', '$location', 'userdatacontext', 'masterdatacontext', dashboard]);

    function dashboard(common, $scope, $modal, $location, userdatacontext, masterdatacontext) {
        var vm = this;

        vm.title = 'Dashboard';

        $scope.contactDetail = {};

        $scope.sendQuery = function()
        {
            //var details = "<p><b>Name:" + $scope.contactDetail.name + " </b></p><br/><p><b>Email:" + $scope.contactDetail.email + " </b></p><br/><p><b>Contact Number:" + $scope.contactDetail.contact + " </b></p><br/><p><b>Message:" + $scope.contactDetail.message + " </b></p>";
            $scope.IsQuerySubmitted = true;
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

        var ExpertList = [];
        $scope.Random4Experts = [];
        $scope.ServerURL = common.serverURL;

        function getExperts() {
            masterdatacontext.GetExperts().success(function (result) {
                ExpertList = result;
                if (ExpertList.length > 4) {
                    getRandom4Experts();
                }
                else {
                    $scope.Random4Experts = ExpertList;
                }
            });
        }

        function getRandom4Experts()
        {
            var arr = [];
            while (arr.length < 4) {
                var randomnumber = Math.ceil(Math.random() * ExpertList.length)
                var found = false;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == randomnumber) { found = true; break }
                }
                if (!found) arr[arr.length] = randomnumber;
            }

            for (var i = 0; i < arr.length; i++) {
                $scope.Random4Experts.push(ExpertList[arr[i]-1]);
            }
            debugger;
        }



        activate();

        function activate() {
            var promises = [getExperts()];
            common.activateController(promises, controllerId);
            //    .then(function () { log('Activated Dashboard View'); });
        }
    }
})();