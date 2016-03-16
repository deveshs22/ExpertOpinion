(function () {
    'use strict';
    var controllerId = 'userquestions';
    angular.module('app').controller(controllerId, ['common', '$scope', '$modal', '$location', 'querydatacontext', 'userdatacontext', questions]);

    function questions(common, $scope, $modal, $location, querydatacontext, userdatacontext) {
        var vm = this;
        vm.news = {
            title: 'Questions',
            description: 'Questions'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Questions';

        $scope.Questions = [];
        $scope.FollowUps = [];

        if (localStorage.getItem("uid") != undefined) {
            userdatacontext.GetUserNamebyUID(localStorage.getItem("uid")).success(function (result) {
                if (result != "" && result != "null" && result != null && result != undefined)
                    $scope.UserName = result.replace('"', '').replace('"', '');
            });
        }

        $scope.viewtab=function(tabId)
        {

        }

        
        activate();

        function activate() {
            var promises = [getQuestions(),getFollowups()];
            common.activateController(promises, controllerId);
            //    .then(function () { log('Activated History View'); });
        }

        function getQuestions() {
            querydatacontext.GetQuestionsforUser(localStorage.getItem("id")).success(function (result) {
                $scope.Questions = result;
            });
        };

        function getFollowups() {
            querydatacontext.GetFollowupsforUser(localStorage.getItem("id")).success(function (result) {
                $scope.FollowUps = result;
            });
        }
    }
})();