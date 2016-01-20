(function () {
    'use strict';
    var controllerId = 'answer';
    angular.module('app').controller(controllerId, ['common', '$scope', '$modal', '$location', 'querydatacontext', 'userdatacontext', answer]);

    function answer
        (common, $scope, $modal, $location, querydatacontext, userdatacontext) {
        var vm = this;
        vm.news = {
            title: 'Expert Opinion',
            description: 'Expert Opinion'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Answer';
        $scope.ServerURL = common.serverURL;
        activate();
        $scope.question = {};
        $scope.FollowUps = [];
        $scope.showingAdditional = false;

        $scope.ShowHideAdditional=function()
        {
            if ($scope.showingAdditional)
                $scope.showingAdditional = false;
            else
                $scope.showingAdditional = true;
        }

        $scope.IsreplyingtoQuestion = false;
        $scope.IsreplyingtoFollowup = false;
        debugger;
        var qid = common.getParameterByName("qid");


        function getQuestionandFollowupDetail(qid)
        {
            querydatacontext.GetQuestion(qid).success(function (result) {
                $scope.question = result;
                $scope.getUserName($scope.question.UserId);
            });
            querydatacontext.GetFollowUpForQuestion(qid).success(function (result) {
                $scope.FollowUps = result;
            });
        }

        $scope.FollowUpQuestion = '';

        $scope.getUserName= function(id)
        {
            userdatacontext.GetUserNamebyID(id).success(function (result) {
                $scope.PatientName = result.replace('"', '').replace('"', '');
            });
        }

        if (qid != "" && qid != undefined) {
            $scope.IsreplyingtoFollowup = true;
            getQuestionandFollowupDetail(qid);
        }



        function activate() {
            //var promises = [getMessageCount(), getPeople()];
            //common.activateController(promises, controllerId)
            //    .then(function () { log('Activated Dashboard View'); });
        }
    }
})();