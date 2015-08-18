(function () {
    'use strict';
    var controllerId = 'hospital';
    angular.module('app').controller(controllerId, ['common', '$scope', '$modal', '$location', 'admindatacontext', 'masterdatacontext', hospital]);

    function hospital(common, $scope, $modal, $location, admindatacontext, masterdatacontext) {
        var vm = this;
        vm.news = {
            title: 'Expert Opinion',
            description: 'Expert Opinion'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';
        $scope.selectedSpeciality = [];
        $scope.selectedCountry = {};
        $scope.selectedState = {};
        $scope.selectedCity = {};
        $scope.showoption2 = false;
        $scope.showoption3 = false;
        $scope.showaddanother = false;
        $scope.Specialities = [];

        $scope.CountryChanged = function()
        {
            getStateList($scope.selectedCountry.CountryId);
        }

        $scope.IssuerCountryChanged = function () {
            getIssuerStateList($scope.selectedCountry.CountryId);
        }

        $scope.StateChanged = function () {
            debugger;
            getCityList($scope.selectedState.StateId);
        }

        
        $scope.saveHospital = function ()
        {
            debugger;
            $scope.IsLoading = true;
            if ($('#Photo').val()) {
                $scope.photoname = common.getGUID() + '.' + $('#Photo').val().split('.')[1];
                masterdatacontext.uploadFile(document.getElementById('Photo').files, $scope.photoname);
            }

            var hospitalData = {};

            hospitalData.HospitalName = $scope.name;
            hospitalData.Address = $scope.address;
            hospitalData.Phone = $scope.phone;
            hospitalData.CountryId = $scope.selectedCountry.CountryId;
            hospitalData.StateId = $scope.selectedState.StateId;
            hospitalData.CityId = $scope.selectedCity.CityId;
            hospitalData.Photo = $scope.photoname;
            hospitalData.Description = $scope.description;
            hospitalData.HospitalSpecialityDetails = $scope.selectedSpeciality;
            
            admindatacontext.CreateHospital(hospitalData).success(function (result) {
                debugger;
                $scope.IsLoading = false;
                $location.url('/admin/managehospitals');
            });
            
        }

        activate();

        function getCountryList()
        {
            masterdatacontext.GetCountryList().success(function (result) {
                $scope.CountryList = result;
            });
        }

        function getStateList(countryId) {
            masterdatacontext.GetStateList(countryId).success(function (result) {
                $scope.StateList = result;
            });
        }

        function getIssuerStateList(countryId) {
            masterdatacontext.GetStateList(countryId).success(function (result) {
                $scope.IssuerStateList = result;
            });
        }

        function getCityList(stateId) {
            masterdatacontext.GetCityList(stateId).success(function (result) {
                $scope.CityList = result;
            });
        }

        function getSpecialityList()
        {
            masterdatacontext.GetHospitalSpecialities().success(function (result) {
                debugger;
                $scope.Specialities = result;
            });
        }

        function activate() {
            var promises = [getCountryList(),getSpecialityList()];
            common.activateController(promises, controllerId);
        }
    }
})();