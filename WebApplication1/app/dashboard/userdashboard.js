(function () {
    'use strict';
    var controllerId = 'userdashboard';
    angular.module('app').controller(controllerId, ['common', '$scope', '$modal', '$location', 'querydatacontext', 'userdatacontext', userdashboard]);

    function userdashboard(common, $scope, $modal, $location, querydatacontext, userdatacontext) {
        var vm = this;
        vm.news = {
            title: 'User Dashboard',
            description: 'User Dashboard'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'User Dashboard';

        $scope.Questions = [];
        
        querydatacontext.GetQuestionsforUser(localStorage.getItem("id")).success(function (result) {
            $scope.Questions = result;
        });


        if (localStorage.getItem("uid") != undefined) {
            userdatacontext.GetUserNamebyUID(localStorage.getItem("uid")).success(function (result) {
                if (result != "" && result != "null" && result != null && result != undefined)
                    $scope.UserName = result.replace('"', '').replace('"', '');
            });
        }
        activate();

        function activate() {
            //var promises = [getMessageCount(), getPeople()];
            //common.activateController(promises, controllerId)
            //    .then(function () { log('Activated Dashboard View'); });
        }
    }
})();