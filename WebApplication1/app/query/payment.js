(function () {
    'use strict';
    var controllerId = 'payment';
    angular.module('app').controller(controllerId, ['common', '$scope', '$modal', '$location', 'userdatacontext', 'querydatacontext','masterdatacontext', payment]);

    function payment
        (common, $scope, $modal, $location, userdatacontext, querydatacontext, masterdatacontext) {
        debugger;
        var vm = this;
        vm.news = {
            title: 'Expert Opinion',
            description: 'Expert Opinion'
        };
        vm.messageCount = 0;
        $scope.ExpertList = [];
        $scope.PriceList = [];
        $scope.QuestionPrice = {};
        $scope.selectedExpert = {};
        $scope.Question = {};
        $scope.AmountPayable=0;
        $scope.dicountcode = '';
        vm.title = 'Payment';
        var qid = common.getParameterByName("qid");
        $scope.expertSubmitted = false;
        $scope.PromoCodeMsg='';
        $scope.SubmitPayment = function()
        {
            $scope.Question.ExpertId = $scope.selectedExpert.UserId;
            querydatacontext.UpdateQuestion(qid, $scope.Question).success(function (result) {
                $scope.expertSubmitted = true;
            });

            var paymentobj = {};
            paymentobj.Amount = $scope.AmountPayable;
            paymentobj.UserId = localStorage.getItem("id");
            paymentobj.TransactionId = localStorage.getItem("id") + '-' + qid + '-' + common.getGUID().substring(0,8);
            querydatacontext.SubmitPayment(paymentobj);
        }

        $scope.ApplyDiscount = function()
        {
            var todaydate = new Date();
            var CouponInfo = {};
            masterdatacontext.GetDicountCouponByCode($scope.dicountcode).success(function (result) {
                debugger;
                if (result == "null")
                {
                    $scope.PromoCodeMsg = 'Invalid Promo code.';
                    return;
                }
                CouponInfo = result;

                var vfrom = CouponInfo.ValidFrom.substring(0, 10);
                var vto = CouponInfo.ValidTo.substring(0, 10);

                if (CouponInfo.UserId != null && localStorage.getItem("id")!=CouponInfo.UserId)
                {
                    $scope.PromoCodeMsg = 'This Promo code is not applicable to you.';
                    return;
                }
                else if (!CouponInfo.IsActive)
                {
                    $scope.PromoCodeMsg = 'This Promo code is not working.';
                    return;
                }
                else if (!dateCheck(vfrom, vto, todaydate))
                {
                    $scope.PromoCodeMsg = 'This Promo Code has expired.';
                    return;
                }
                else
                {
                    if (CouponInfo.OfferTypeDesc=="Percentage")
                    {
                        $scope.AmountPayable = $scope.PriceList[0].Price - (($scope.PriceList[0].Price * CouponInfo.OfferValue) / 100);
                    }
                    $scope.PromoCodeMsg = 'Promo Code Successfully applied. ' + CouponInfo.OfferDescription + " Total Amount Payable is now " + $scope.AmountPayable;
                }
            });
        }

        activate();

        function activate() {
            var promises = [getExperts(), getPrices(), getQuestion()];
            common.activateController(promises, controllerId);
            //    .then(function () { log('Activated Dashboard View'); });
        }

        function getExperts()
        {
            masterdatacontext.GetExperts().success(function (result) {
                $scope.ExpertList = result;
            });
        }

        function getPrices() {
            masterdatacontext.GetPriceCategories().success(function (result) {
                //debugger;
                $scope.PriceList = result;
                $scope.AmountPayable = $scope.PriceList[0].Price;
            });
        }

        function getQuestion()
        {
            querydatacontext.GetQuestion(qid).success(function (result) {
                $scope.Question = result;
            });
        }

        function dateCheck(from, to, check) {

            var fDate, lDate, cDate;
            fDate = Date.parse(from);
            lDate = Date.parse(to);
            cDate = Date.parse(check);

            if ((cDate <= lDate && cDate >= fDate)) {
                return true;
            }
            return false;
        }
    }
})();