﻿(function () {
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


        $scope.addFormFields = function (form, data) {
            if (data != null) {
                $.each(data, function (name, value) {
                    if (value != null) {
                        var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value);
                        form.append(input);
                    }
                });
            }
        };


        $scope.checkout = function()
        {
            var data = {
                cmd: "_cart",
                business: 'info-facilitator@expertopinion.us',
                upload: "1",
                rm: "2",
                charset: "utf-8"
            };

            // item data
            for (var i = 0; i < 1; i++) {
                data["item_number_1"] = 'Charges for query';
                data["item_name_1"] = 'query';
                data["quantity_1"] = 1;
                data["amount_1" ] = 5;
                data["notify_url"] = "http://www.expertopinion.us/#/payment?success=true"
            }

            // build form
            var form = $('<form/></form>');
            form.attr("action", "https://www.sandbox.paypal.com/cgi-bin/webscr");
            form.attr("method", "POST");
            form.attr("style", "display:none;");
            this.addFormFields(form, data);
            //this.addFormFields(form, parms.options);
            $("body").append(form);

            // submit form
            //this.clearCart = clearCart == null || clearCart;
            form.submit();

            form.submit(function () {
                $.ajax({
                    url: form.attr('action'),
                    type: post,
                    data: form.serialize(),
                    success: function (response,data) {
                        debugger;
                    }
                });
                return false;
            });

            form.remove();
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