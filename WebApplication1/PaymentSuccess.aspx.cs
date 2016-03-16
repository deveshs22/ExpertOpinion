using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class PaymentSuccess : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {

            //using (WebClient client = new WebClient())
            //{
            //    //System.Collections.Specialized.NameValueCollection reqparm = new System.Collections.Specialized.NameValueCollection();

            //    var reqparm = new Dictionary<string, object>();

            //    reqparm.Add("TransactionId", Request.Form["txn_id"]);
            //    reqparm.Add("Invoice", Request.Form["invoice"]);
            //    reqparm.Add("Amount", Request.Form["payment_gross"]);
            //    reqparm.Add("PmtDate", Request.Form["payment_date"]);
            //    reqparm.Add("Success", "S");
            //    //StringBuilder response = new StringBuilder();
            //    //foreach (string key in Request.Form)
            //    //{
            //    //    response.Append(key + "-" + Request.Form[key] + ",");
            //    //}

            //    //reqparm.Add("Response", response.ToString());

            //    string json = new JavaScriptSerializer().Serialize(reqparm);

            //    client.UploadStringCompleted += client_UploadStringCompleted;

            //    client.UploadString(new Uri(ConfigurationManager.AppSettings["serviceBaseURL"].ToString() + "payment/updatePayment/"), "POST", json.ToString());
                
            //    //string responsebody = Encoding.UTF8.GetString(responsebytes);
            //}
        }
        catch
        {

        }
    }

    void client_UploadStringCompleted(object sender, UploadStringCompletedEventArgs e)
    {
       
    }


    
}