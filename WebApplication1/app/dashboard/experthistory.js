(function () {
    'use strict';
    var controllerId = 'experthistory';
    angular.module('app').controller(controllerId, ['common', '$scope', '$modal', '$location', 'querydatacontext', 'userdatacontext', experthistory]);

    function experthistory(common, $scope, $modal, $location, querydatacontext, userdatacontext) {
        var vm = this;
        vm.news = {
            title: 'Expert History',
            description: 'Expert History'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Expert History';

        $scope.Questions = [];

        if (localStorage.getItem("uid") != undefined) {
            userdatacontext.GetUserNamebyUID(localStorage.getItem("uid")).success(function (result) {
                if (result != "" && result != "null" && result != null && result != undefined)
                    $scope.UserName = result.replace('"', '').replace('"', '');
            });
        }

        
        activate();

        function activate() {
            var promises = [getQuestions()];
            common.activateController(promises, controllerId);
            //    .then(function () { log('Activated History View'); });
        }

        function getQuestions() {
            querydatacontext.GetQuestionsHistoryforExpert(localStorage.getItem("id")).success(function (result) {
                $scope.Questions = result;
            });
        };
    }
})();