using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System;
using System.IO;
using System.Drawing;
using System.Collections.Generic;
using System.Configuration;

namespace DataService.Controllers
{
    public class UploadController : ApiController
    {
        public HttpResponseMessage PostFormData()
        {
            HttpResponseMessage result = null;
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                var docfiles = new List<string>();
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];

                    var filePath = Guid.NewGuid() + "." + postedFile.FileName.Split('.')[1];
                    postedFile.SaveAs(HttpContext.Current.Server.MapPath("/Attachments/") + filePath);

                    docfiles.Add(filePath);
                }
                result = Request.CreateResponse(HttpStatusCode.Created, docfiles);
            }
            else
            {
                result = Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            return result;
        }



    }
}