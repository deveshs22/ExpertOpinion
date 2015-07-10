(function () {
    'use strict';
    var controllerId = 'reply';
    angular.module('app').controller(controllerId, ['common', '$scope', '$modal', '$location', 'querydatacontext', 'userdatacontext', reply]);

    function reply
        (common, $scope, $modal, $location, querydatacontext, userdatacontext) {
        var vm = this;
        vm.news = {
            title: 'Expert Opinion',
            description: 'Expert Opinion'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Reply';
        activate();
        $scope.question = {};
        $scope.FollowUps = [];

        $scope.IsreplyingtoQuestion = false;
        $scope.IsreplyingtoFollowup = false;
        debugger;
        var qid = common.getParameterByName("qid");

        var fid = common.getParameterByName("fid");

        var userfid = common.getParameterByName("userfid");

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

        $scope.getUserName= function(id)
        {
            userdatacontext.GetUserNamebyID(id).success(function (result) {
                $scope.PatientName = result.replace('"', '').replace('"', '');
            });
        }

        if (qid != "" && qid != undefined) {
            $scope.IsreplyingtoQuestion = true;
            querydatacontext.GetQuestion(qid).success(function (result) {
                $scope.question = result;
                $scope.getUserName($scope.question.UserId);
            });
        }
        else if (fid != "" &&  fid != undefined)
        {
            $scope.IsreplyingtoFollowup = true;
            getQuestionandFollowupDetail(fid);
        }
        else if (userfid != "" && userfid != undefined)
        {
            $scope.IsFollowuptoreply = true;
            getQuestionandFollowupDetail(userfid);
        }

        $scope.answer = '';

        $scope.SubmitReply = function ()
        {
            querydatacontext.UpdateQuestion(qid,$scope.question).success(function (result) {
                debugger;
            });
        }

        function activate() {
            //var promises = [getMessageCount(), getPeople()];
            //common.activateController(promises, controllerId)
            //    .then(function () { log('Activated Dashboard View'); });
        }
    }
})();