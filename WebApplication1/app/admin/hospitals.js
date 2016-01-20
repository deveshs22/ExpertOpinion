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
        $scope.ServerURL = common.serverURL;
        $scope.hospital = {};
        $scope.selectedSpeciality = [];
        $scope.selectedCountry = {};
        $scope.selectedState = {};
        $scope.selectedCity = {};
        $scope.showoption2 = false;
        $scope.showoption3 = false;
        $scope.showaddanother = false;
        $scope.Specialities = [];
        $scope.IsEditMode = false;
        var hospitalId = 0;

        if (common.getParameterByName("edit") != undefined && common.getParameterByName("edit") != "") {
            $scope.IsEditMode = true;
            hospitalId = common.getParameterByName("edit");
            //loadHospitalDetails();
        }
        activate();


        function loadHospitalDetails()
        {
            if ($scope.IsEditMode) {
                admindatacontext.GetHospital(hospitalId).success(function (result) {
                    debugger;
                    $scope.hospital = result;
                    getCountryList();
                    $scope.name = result.HospitalName;
                    $scope.address = result.Address;
                    $scope.phone = result.Phone;
                    $scope.description = result.Description;
                    $scope.photoname = result.Photo;
                    $scope.selectedSpeciality = result.HospitalSpecialityDetails;
                    var selectedSpecialities = [];
                    for (var i = 0; i < result.HospitalSpecialityDetails.length; i++) {
                        selectedSpecialities.push($scope.selectedSpeciality[i].HospitalSpecialityId);
                    }

                    $("#cmbspeciality").val(selectedSpecialities);
                    $('#cmbspeciality').trigger('liszt:updated');
                });
            }
        }

        $scope.CountryChanged = function () {
            getStateList($scope.selectedCountry.CountryId);
        }

        $scope.IssuerCountryChanged = function () {
            getIssuerStateList($scope.selectedCountry.CountryId);
        }

        $scope.StateChanged = function () {
            getCityList($scope.selectedState.StateId);
        }


        $scope.saveHospital = function () {
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

            if (!$scope.IsEditMode) {
                admindatacontext.CreateHospital(hospitalData).success(function (result) {
                    $scope.IsLoading = false;
                });
            }
            else
            {
                hospitalData.HospitalId = hospitalId;
                admindatacontext.UpdateHospital(hospitalId, hospitalData).success(function (result) {
                    $scope.IsLoading = false;
                });
            }
            $location.url('/admin/managehospitals');
        }

        function setCountry()
        {
                $scope.selectedCountry = $scope.CountryList.filter(function (r) {
                    return r.CountryId == $scope.hospital.CountryId;
                })[0];
                getStateList($scope.hospital.CountryId);
        }

        function setState() {
            $scope.selectedState = $scope.StateList.filter(function (r) {
                return r.StateId == $scope.hospital.StateId;
            })[0];
            getCityList($scope.hospital.StateId);
        }

        function setCity() {
            $scope.selectedCity = $scope.CityList.filter(function (r) {
                return r.CityId == $scope.hospital.CityId;
            })[0];
        }

        function getCountryList() {
            masterdatacontext.GetCountryList().success(function (result) {
                $scope.CountryList = result;
                if ($scope.IsEditMode) {
                    setCountry();
                }
            });
        }

        function getStateList(countryId) {
            masterdatacontext.GetStateList(countryId).success(function (result) {
                $scope.StateList = result;
                if ($scope.IsEditMode) {
                    setState();
                }
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
                setCity();
            });
        }

        function getSpecialityList() {
            masterdatacontext.GetHospitalSpecialities().success(function (result) {
                $scope.Specialities = result;
            });
        }

        function activate() {
            var promises = [loadHospitalDetails(), $scope.IsEditMode ? null : getCountryList(), getSpecialityList()];
            common.activateController(promises, controllerId);
        }
    }
})();