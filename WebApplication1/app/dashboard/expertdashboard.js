(function () {
    'use strict';
    var controllerId = 'expertdashboard';
    angular.module('app').controller(controllerId, ['common', '$scope', '$modal', '$location', 'querydatacontext', 'userdatacontext', expertdashboard]);

    function expertdashboard(common, $scope, $modal, $location, querydatacontext, userdatacontext) {
        var vm = this;
        vm.news = {
            title: 'Expert Dashboard',
            description: 'Expert Dashboard'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Expert Dashboard';

        $scope.Questions = [];
        $scope.FollowUps = [];

        if (localStorage.getItem("uid") != undefined) {
            userdatacontext.GetUserNamebyUID(localStorage.getItem("uid")).success(function (result) {
                if (result != "" && result != "null" && result != null && result != undefined)
                    $scope.UserName = result.replace('"', '').replace('"', '');
            });
        }

        querydatacontext.GetQuestionsforExpert(localStorage.getItem("id")).success(function (result) {
            $scope.Questions = result;
        });

        querydatacontext.GetFollowupsforExpert(localStorage.getItem("id")).success(function (result) {
            $scope.FollowUps = result;
        });

        activate();

        function activate() {
            //var promises = [getMessageCount(), getPeople()];
            //common.activateController(promises, controllerId)
            //    .then(function () { log('Activated Dashboard View'); });
        }
    }
})();