(function () {
    'use strict';
    var controllerId = 'userpaymentreport';
    angular.module('app').controller(controllerId, ['common', '$scope', '$modal', '$location', 'querydatacontext', 'userdatacontext', experthistory]);

    function experthistory(common, $scope, $modal, $location, querydatacontext, userdatacontext) {
        var vm = this;
        vm.news = {
            title: 'Payment Report',
            description: 'Payment Report'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Payment Report';
        $scope.frdate = '';
        $scope.todate = '';
        $scope.FilteredTransactions = [];
        $scope.Transactions = [];
        
        if (localStorage.getItem("uid") != undefined) {
            userdatacontext.GetUserNamebyUID(localStorage.getItem("uid")).success(function (result) {
                if (result != "" && result != "null" && result != null && result != undefined)
                    $scope.UserName = result.replace('"', '').replace('"', '');
            });
        }

        $scope.filterReport  = function()
        {
            $scope.FilteredTransactions = $scope.Transactions.filter(function (r) {
                 return common.dateCheck($scope.frdate, $scope.todate, r.PmtDate)
            });
        }

        
        activate();

        function activate() {
            var promises = [getTransactions()];
            common.activateController(promises, controllerId);
            //    .then(function () { log('Activated History View'); });
        }

        function getTransactions() {
            debugger;
            userdatacontext.GetPaymentTransactions(false, localStorage.getItem("id")).success(function (result) {
                debugger;
                $scope.Transactions = result;
                $scope.FilteredTransactions = result;
            });
        };
    }
})();