(function () {
    'use strict';
    var controllerId = 'reply';
    angular.module('app').controller(controllerId, ['common', '$scope', '$modal','$location', 'querydatacontext', reply]);

    function reply
        (common, $scope, $modal,$location, querydatacontext) {
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
        var qid = common.getParameterByName("qid");

        if (qid != undefined) {
            querydatacontext.GetQuestion(qid).success(function (result) {
                $scope.question = result;
            });
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