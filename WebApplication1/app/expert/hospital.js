(function () {
    'use strict';
    var controllerId = 'hospitallist';
    angular.module('app').controller(controllerId, ['common', '$scope', '$modal', '$location', 'querydatacontext', 'userdatacontext', 'masterdatacontext', hospitallist]);

    function hospitallist
        (common, $scope, $modal, $location, querydatacontext, userdatacontext, masterdatacontext) {
        var vm = this;
        vm.news = {
            title: 'Expert Opinion',
            description: 'Expert Opinion'
        };
        vm.messageCount = 0;
        vm.HospitalList = [];
        vm.title = 'Hospital';
        activate();


        function activate() {
            var promises = [getHospitals()];
            common.activateController(promises, controllerId)
                //.then(function () { log('Activated Dashboard View'); });
        }

        function getHospitals()
        {
            masterdatacontext.GetHospitalList().success(function (result) {
                $scope.HospitalList = result;
            });
        }
    }
})();