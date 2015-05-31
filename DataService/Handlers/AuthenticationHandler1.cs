using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Net.Http;
using System.Threading;
using System.Net;
using System.Security.Claims;

namespace DataService.Handlers
{
    //public class AuthenticationHandler1 : DelegatingHandler
    //{
    //    protected override Task<HttpResponseMessage> SendAsync(
    //        HttpRequestMessage request, CancellationToken cancellationToken)
    //    {

    //        if (!HttpContext.Current.User.Identity.IsAuthenticated)
    //        {
    //            HttpContext.Current.User = CreateDummyClaimsPrincipal();
    //        }
    //        HttpContext.Current.User = CreateDummyClaimsPrincipal();

    //        return base.SendAsync(request, cancellationToken);
    //    }

    //    private ClaimsPrincipal CreateDummyClaimsPrincipal()
    //    {
    //        var allClaims = new List<Claim>();
    //        allClaims.Add(new Claim("UserName", "test"));

    //        var identity = new ClaimsIdentity(HttpContext.Current.User.Identity.AuthenticationType);
    //        identity.AddClaim(new Claim(ClaimTypes.Name, "test"));
    //        var dummyIdentity = new ClaimsIdentity(identity);

    //        //var dummyIdentity = new ClaimsIdentity(allClaims);
    //        var dummyClaimsPrincipal = new ClaimsPrincipal(dummyIdentity);
    //        //dummyClaimsPrincipal.Claims.Concat(allClaims);

    //        return dummyClaimsPrincipal;
    //    }
    //}

}
