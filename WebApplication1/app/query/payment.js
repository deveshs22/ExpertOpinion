(function () {
    'use strict';
    var controllerId = 'payment';
    angular.module('app').controller(controllerId, ['common', '$scope', '$modal', '$location', 'userdatacontext', 'querydatacontext', payment]);

    function payment
        (common, $scope, $modal, $location, userdatacontext, querydatacontext) {
        debugger;
        var vm = this;
        vm.news = {
            title: 'Expert Opinion',
            description: 'Expert Opinion'
        };
        vm.messageCount = 0;
        $scope.ExpertList = [];
        $scope.selectedExpert = {};
        $scope.Question = {};
        vm.title = 'Payment';
        var qid = common.getParameterByName("qid");

        $scope.SubmitPayment = function()
        {
            $scope.Question.ExpertId = $scope.selectedExpert.UserId;
            querydatacontext.AssignExpertToQuestion(qid, $scope.Question);
        }

        activate();

        function activate() {
            var promises = [getExperts(),getQuestion()];
            common.activateController(promises, controllerId);
            //    .then(function () { log('Activated Dashboard View'); });
            //getExperts();
        }

        function getExperts()
        {
            userdatacontext.GetExperts().success(function (result) {
                $scope.ExpertList = result;
            });
        }

        function getQuestion()
        {
            querydatacontext.GetQuestion(qid).success(function (result) {
                $scope.Question = result;
            });
        }
    }
})();