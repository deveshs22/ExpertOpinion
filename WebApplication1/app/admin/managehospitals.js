(function () {
    'use strict';
    var controllerId = 'managehospital';
    angular.module('app').controller(controllerId, ['common', '$scope', '$modal', '$location', 'admindatacontext', 'masterdatacontext', managehospital]);

    function managehospital(common, $scope, $modal, $location, admindatacontext, masterdatacontext) {
        var vm = this;
        vm.news = {
            title: 'Expert Opinion',
            description: 'Expert Opinion'
        };
        vm.title = 'Dashboard';
        $scope.Hospitals = [];

        activate();

        function GetHospitalList()
        {
            masterdatacontext.GetHospitalList().success(function (result) {
                debugger;
                $scope.Hospitals = result;
            });
        }

        function activate() {
            var promises = [GetHospitalList()];
            common.activateController(promises, controllerId);
        }
    }
})();