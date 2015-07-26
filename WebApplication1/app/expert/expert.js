(function () {
    'use strict';
    var controllerId = 'expert';
    angular.module('app').controller(controllerId, ['common', '$scope', '$modal', '$location', 'querydatacontext', 'userdatacontext', expert]);

    function expert
        (common, $scope, $modal, $location, querydatacontext, userdatacontext) {
        var vm = this;
        vm.news = {
            title: 'Expert Opinion',
            description: 'Expert Opinion'
        };
        vm.messageCount = 0;
        vm.ExpertList = [];
        vm.title = 'Expert';
        activate();


        function activate() {
            var promises = [getExperts()];
            common.activateController(promises, controllerId)
                //.then(function () { log('Activated Dashboard View'); });
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