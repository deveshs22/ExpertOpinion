(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common','$scope', '$modal','$location', dashboard]);

    function dashboard(common, $scope, $modal, $location) {
        debugger;
        var vm = this;
        vm.news = {
            title: 'Expert Opinion',
            description: 'Expert Opinion'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';

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