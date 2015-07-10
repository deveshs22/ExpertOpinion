(function () {
    'use strict';
    var controllerId = 'payment';
    angular.module('app').controller(controllerId, ['common', '$scope', '$modal', '$location', 'userdatacontext', query]);

    function payment
        (common, $scope, $modal, $location, userdatacontext) {
        var vm = this;
        vm.news = {
            title: 'Expert Opinion',
            description: 'Expert Opinion'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Payment';

        activate();

        function activate() {
            //var promises = [getMessageCount(), getPeople()];
            //common.activateController(promises, controllerId)
            //    .then(function () { log('Activated Dashboard View'); });
        }
    }
})();