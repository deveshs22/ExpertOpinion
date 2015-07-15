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
        vm.title = 'Payment';

        $scope.SubmitPayment = function()
        {
            debugger;
            querydatacontext.AssignExpertToQuestion(8, 13);
        }

        activate();

        function activate() {
            var promises = [getExperts()];
            common.activateController(promises, controllerId);
            //    .then(function () { log('Activated Dashboard View'); });
            //getExperts();
        }

        function getExperts()
        {
            userdatacontext.GetExperts().success(function (result) {
                debugger;
                $scope.ExpertList = result;
            });
        }
    }
})();