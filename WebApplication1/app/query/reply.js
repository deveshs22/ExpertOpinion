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
        $scope.ServerURL = common.serverURL;
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

        $scope.FollowUpQuestion = '';

        $scope.SubmitFollowuptoReply= function()
        {
            var followup = {};
            followup.FollowUpQuestion = $scope.FollowUpQuestion;
            followup.QuestionId = userfid;
            followup.FolllowUpIndex = $scope.FollowUps.length;
            followup.UserId = $scope.question.UserId;
            followup.ExpertId = $scope.question.ExpertId;
            followup.LastModifiedBy = $scope.question.UserId;
            querydatacontext.CreateFollowup(followup).success(function (result) {
                $scope.FollowUpQuestion = '';
                querydatacontext.GetFollowUpForQuestion(userfid).success(function (result) {
                    $scope.FollowUps = result;
                });
            });
        }

        $scope.ExpertFollowupReply='';
        $scope.SubmitReplytoFollowup= function()
        {
            var fupid = common.getParameterByName("fupid");
            var followup= $scope.FollowUps.filter(function (r) {
                return r.FollowUpId = fupid;
            })[0];
            
            followup.ExpertReply = $scope.ExpertFollowupReply;
            querydatacontext.UpdateFollowup(fupid,followup).success(function (result) {
                $scope.ExpertFollowupReply = '';
                $scope.FollowUps = result;
                $location.url('/expertdashboard');
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
                $location.url('/expertdashboard');
            });
        }

        function activate() {
            //var promises = [getMessageCount(), getPeople()];
            //common.activateController(promises, controllerId)
            //    .then(function () { log('Activated Dashboard View'); });
        }
    }
})();