﻿(function () {
    'use strict';
    var controllerId = 'profile';
    angular.module('app').controller(controllerId, ['common', '$scope', '$modal', '$location', 'userdatacontext', 'masterdatacontext', profile]);

    function profile(common, $scope, $modal, $location, userdatacontext, masterdatacontext) {
        var vm = this;
        vm.news = {
            title: 'Expert Opinion',
            description: 'Expert Opinion'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';
        $scope.selectedSpeciality = {};
        $scope.selectedCountry = {};
        $scope.selectedState = {};
        $scope.selectedCity = {};
        $scope.showoption2 = false;
        $scope.showoption3 = false;
        $scope.showaddanother = false;
        $scope.Specialities = [];

        activate();

        if (common.getParameterByName("edit") != undefined && common.getParameterByName("edit") != "") {
            $scope.IsEditMode = true;
        }

        masterdatacontext.GetSpecialities().success(function (result) {
            debugger;
            $scope.Specialities = result;
        });

        $scope.addAnother = function () {
            $scope.showaddanother = false;
            if (!$scope.showoption2) {
                $scope.showoption2 = true;
            }
            else if (!$scope.showoption3) {
                $scope.showoption3 = true;
            }
        }

        if (localStorage.getItem("uid") != undefined) {
            var uid = 0;
            userdatacontext.GetUserNamebyUID(localStorage.getItem("uid")).success(function (result) {
                if (result != "" && result != "null" && result != null && result != undefined) 
                    $scope.UserName = result.replace('"', '').replace('"', '');
            });


            if (common.getParameterByName("edit") != undefined && common.getParameterByName("edit") != "") {
                $scope.IsEditMode = true;
                loadExpertDetails(localStorage.getItem("id"));
            }
        }

        function loadExpertDetails(uid) {
            userdatacontext.GetExpertProfile(uid).success(function (result) {
                debugger;
                $scope.dob = new Date();
                $scope.gender = result.Gender;
                $scope.phone = result.Phone;
                $scope.mobile = result.Mobile;
                $scope.address = result.Address;
                $scope.selectedCountry.CountryId = $scope.CountryList.filter(function (r) {
                    return r.CountryId == result.CountryId;
                })[0]; 
                $scope.selectedState.StateId = $scope.StateList.filter(function (r) {
                    return r.StateId == result.StateId;
                })[0]; 
                $scope.selectedCity.CityId = $scope.CityList.filter(function (r) {
                    return r.CityId == result.CityId;
                })[0]; 
                $scope.selectedSpeciality.SpecialityId = result.SpecialityId;
                $scope.licenceno = result.LicenceNo;
                $scope.issuerName = result.Issuer;
                $scope.selectedIssuerCountry = $scope.CountryList.filter(function (r) {
                    return r.CountryId == result.IssuerCountryId;
                })[0]; 
                $scope.selectedIssuerState.StateId = $scope.StateList.filter(function (r) {
                    return r.StateId == result.IssuerStateId;
                })[0]; 
                $scope.issuerContactNo = result.IssuerContact;
                $scope.photoname = result.Photo;
                $scope.resumename = result.Resume;
                $scope.certificate1name = result.Certificate1;
                $scope.certificate2name = result.Certificate2;
                $scope.certificate3name = result.Certificate3;
                $scope.qualification = result.Qualification;
                $scope.description = result.Description;
            });
        }
    

        $scope.fileadded = function (fileid, ctrl) {
            debugger;
            switch (fileid) {
                case 1:
                    $scope.showaddanother = true;
                    break;
                case 2:
                    $scope.showaddanother = true;
                    break;
                case 3:
                    $scope.showaddanother = false;
                    break;
            }
            $scope.$apply();
        }

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

        $scope.gonext=function()
        {
            $scope.IsStep2 = true;
        }

        $scope.goprevious = function () {
            $scope.IsStep2 = false;
        }

        
        
        
        $scope.saveProfile = function ()
        {
            $scope.IsLoading = true;
            if ($('#expertPhoto').val()) {
                $scope.photoname = common.getGUID() +'.' +$('#expertPhoto').val().split('.')[1];
                masterdatacontext.uploadFile(document.getElementById('expertPhoto').files, $scope.photoname);
            }
            if ($('#expertResume').val()) {
                $scope.resumename = common.getGUID() + '.' + $('#expertResume').val().split('.')[1];
                masterdatacontext.uploadFile(document.getElementById('expertResume').files, $scope.resumename);
            }
            if ($('#certificate1').val()) {
                $scope.certificate1name = common.getGUID() + '.' + $('#certificate1').val().split('.')[1];
                masterdatacontext.uploadFile(document.getElementById('certificate1').files, $scope.certificate1name);
            }
            if ($('#certificate2').val()) {
                $scope.certificate2name = common.getGUID() + '.' + $('#certificate2').val().split('.')[1];
                masterdatacontext.uploadFile(document.getElementById('certificate2').files, $scope.certificate2name);
            }
            if ($('#certificate3').val()) {
                $scope.certificate3name = common.getGUID() + '.' + $('#certificate3').val().split('.')[1];
                masterdatacontext.uploadFile(document.getElementById('certificate3').files, $scope.certificate3name);
            }

            var profileData = {};
            profileData.UserId = localStorage.getItem("id");
            profileData.DOB = $scope.dob;
            profileData.Gender = $scope.gender;
            profileData.Phone = $scope.phone;
            profileData.Mobile = $scope.mobile;
            profileData.Address = $scope.address;
            profileData.CountryId = $scope.selectedCountry.CountryId;
            profileData.StateId = $scope.selectedState.StateId;
            profileData.CityId = $scope.selectedCity.CityId;
            profileData.SpecialityId = $scope.selectedSpeciality.SpecialityId;
            profileData.LicenceNo = $scope.licenceno;
            profileData.Issuer = $scope.issuerName;
            profileData.IssuerCountryId = $scope.selectedIssuerCountry.CountryId;
            profileData.IssuerStateId = $scope.selectedIssuerState.StateId;
            profileData.IssuerContact = $scope.issuerContactNo;
            profileData.Photo = $scope.photoname;
            profileData.Resume = $scope.resumename;
            profileData.Certificate1 = $scope.certificate1name;
            profileData.Certificate2 = $scope.certificate2name;
            profileData.Certificate3 = $scope.certificate3name;
            profileData.Qualification = $scope.qualification;
            profileData.Description = $scope.description;
            
            userdatacontext.CreateExpertProfile(profileData).success(function (result) {
                $scope.IsLoading = false;
                $location.url('\expertdashboard');
            });
            
        }

       function getCountryList()
        {
            masterdatacontext.GetCountryList().success(function (result) {
                $scope.CountryList = result;
            });
        }

        function getStateList(countryId) {
            masterdatacontext.GetStateList(countryId).success(function (result) {
                debugger;
                $scope.StateList = result;
            });
        }

        function getIssuerStateList(countryId) {
            masterdatacontext.GetStateList(countryId).success(function (result) {
                debugger;
                $scope.IssuerStateList = result;
            });
        }

        function getCityList(stateId) {
            masterdatacontext.GetCityList(stateId).success(function (result) {
                debugger;
                $scope.CityList = result;
            });
        }

        function activate() {
            var promises = [getCountryList()];
            common.activateController(promises, controllerId);
        }
    }
})();