(function () {
    'use strict';
    var controllerId = 'query';
    angular.module('app').controller(controllerId, ['common', '$scope', '$modal','$location', 'querydatacontext', query]);

    function query
        (common, $scope, $modal,$location, querydatacontext) {
        var vm = this;
        vm.news = {
            title: 'Expert Opinion',
            description: 'Expert Opinion'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Query';
        
        $scope.showoption2 = false;
        $scope.showoption3 = false;
        $scope.showaddanother = false;
        $scope.addAnother = function()
        {
            $scope.showaddanother = false;
            if (!$scope.showoption2)
            {
                $scope.showoption2 = true;
            }
            else if (!$scope.showoption3) {
                $scope.showoption3 = true;
            }
        }

        $scope.gotoPayment = function()
        {
            $location.url('\payment');
        }

        $scope.addQuery = function ()
        {
            debugger;
            var queryData = {};
            queryData.PatientAge = $scope.PatientAge;
            queryData.PatientGender = $scope.PatientGender;
            queryData.VisitedDoctor = $scope.VisitedDoctor ? true : false;
            queryData.Remarks = $scope.Remarks;
            queryData.Attach1 = $scope.file1name;
            queryData.Attach2 = $scope.file2name;
            queryData.Attach3 = $scope.file3name;
            queryData.UserId = localStorage.getItem("id");
            queryData.Description = common.queryData.question;
            querydatacontext.CreateQuestion(queryData).success(function (result) {
                $scope.IsLoading = false;
                $location.url('/payment');
            });
        }

        $scope.ProceedQuery = function()
        {
            $scope.IsLoading = true;
            if ($('#file1').val()) {
                querydatacontext.uploadFile(document.getElementById('file1').files).success(function (result) {
                    $scope.file1name = result[0];
                    if ($('#file2').val()) {
                        querydatacontext.uploadFile(document.getElementById('file2').files).success(function (result) {
                            $scope.file2name = result[0];
                            if ($('#file3').val()) {
                                querydatacontext.uploadFile(document.getElementById('file3').files).success(function (result) {
                                    $scope.file3name = result[0];
                                    $scope.addQuery();
                                });
                            }
                            else {
                                $scope.addQuery();
                            }
                        });
                    }
                    else {
                        $scope.addQuery();
                    }
                });
            }
            else
            {
                $scope.addQuery();
            }
        }

        $scope.fileadded = function(fileid, ctrl)
        {
            switch (fileid)
            {
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

        activate();

        function activate() {
            //var promises = [getMessageCount(), getPeople()];
            //common.activateController(promises, controllerId)
            //    .then(function () { log('Activated Dashboard View'); });
        }
    }
})();