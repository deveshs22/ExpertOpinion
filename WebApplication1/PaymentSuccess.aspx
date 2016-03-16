<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PaymentSuccess.aspx.cs" Inherits="PaymentSuccess" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="scripts/jquery-2.1.1.js"></script>
    <script>
        $(document).ready(function () {
            debugger;
            
            var obj = {};

            obj.TransactionId = '<% = Request.Form["txn_id"] %>';
            obj.Invoice = '<% = Request.Form["invoice"] %>';
            obj.Amount = '<% = Request.Form["payment_gross"] %>';
            obj.PmtDate = '<% = Request.Form["payment_date"] %>';
            obj.Status = 'S';

            var url = '<% = ConfigurationManager.AppSettings["serviceBaseURL"].ToString() + "payment/updatePayment" %>';
            
            var obj1 = '{ name: "John", time: "2pm" }';
            $.ajax({
                url: url,
                
                method: 'POST',
                data: JSON.stringify(obj)
            })
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    Thanks for your payment! Expert has been assigned to this question
        <br />
        Please click <a href="../">here</a> to redirect to the website.
    </div>
    </form>
</body>
</html>
