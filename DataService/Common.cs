using System.Net.Mail;
using System.Net;
using System.Configuration;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
public static class Common
{ 
    public static void SendMail(string toEmail, string message, string subject)
    {
        using (var client = new SmtpClient(ConfigurationManager.AppSettings["SMTP"].ToString(), Convert.ToInt32(ConfigurationManager.AppSettings["SMTPPort"]))
        {
            Credentials = new NetworkCredential(ConfigurationManager.AppSettings["AdminEmailId"].ToString(), ConfigurationManager.AppSettings["AdminEmailPassword"].ToString()),
            EnableSsl = false
        })
        {
            MailMessage msg = new MailMessage(ConfigurationManager.AppSettings["AdminEmailId"].ToString(), toEmail,subject, message);
            msg.IsBodyHtml=true;
            
            try
            {
                client.Send(msg);
                //client.SendAsync(msg, null);
            }
            catch (Exception) { }
            finally
            {
                msg.Dispose();            
            }
        }
    }
}

public class SearchData
{
    public DateTime DateFrom { get; set; }

    public DateTime DateTo { get; set; }

    public string City { get; set; }

    public int Accomodates { get; set; }

    public int NumberofRecords { get; set; }

    public int PageNum { get; set; }

    public int MinPrice { get; set; }

    public int MaxPrice { get; set; }

    public string HomeType { get; set; }

    public string Amenities { get; set; }

    public string Keyword { get; set; }

    public string MinLat { get; set; }

    public string MaxLat { get; set; }

    public string MinLng { get; set; }

    public string MaxLng { get; set; }
}



[DataContract]
public class SearchResult
{
    [DataMember]
    public int ListingId { get; set; }

    [DataMember]
    public string Amenities { get; set; }

    [DataMember]
    public string Title { get; set; }

    [DataMember]
    public bool PriceOverride { get; set; }

    [DataMember]
    public int? Price { get; set; }

    [DataMember]
    public string PriceType { get; set; }

    [DataMember]
    public string HomeType { get; set; }

    [DataMember]
    public string CurrencyCode { get; set; }

    [DataMember]
    public string CurrencySymbol { get; set; }

    //[DataMember]
    //public List<string> Photos { get; set; }

    [DataMember]
    public string Photos { get; set; }

    [DataMember]
    public string Apt { get; set; }

    [DataMember]
    public string Street { get; set; }

    [DataMember]
    public string City { get; set; }

    [DataMember]
    public string State { get; set; }

    [DataMember]
    public string Country { get; set; }

    [DataMember]
    public string Latitude { get; set; }

    [DataMember]
    public string Longtitude { get; set; }
}