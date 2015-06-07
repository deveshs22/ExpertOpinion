using Data.Models;
using DataService.Repository;
using System.Collections;
using System.Collections.Generic;
using System.Web.Http;
using System.Linq;
using System.Net.Http;
using System.Net;
using System;
using System.Data.Entity.Infrastructure;
using System.Web.Script.Serialization;
using System.Text;
using System.Security;
using System.IO;
using System.Web;

namespace DataService.Controllers
{
    public class FollowUpController : ApiController
    {
        UnitOfWork unitOfWork;
        protected IRepository<FollowUp> FollowUpRepository { get; set; }

        protected string[] Includes { get; set; }
 
        public FollowUpController()
        {
            unitOfWork = new UnitOfWork();
            this.FollowUpRepository = unitOfWork.Repository<FollowUp>();
        }
 
        // GET api/<controller>
        public IEnumerable<FollowUp> GetFollowUps()
        {
            return FollowUpRepository.GetAll();
        }
 
        // GET api/<controller>/5
        public FollowUp Get(int id)
        {
            return FollowUpRepository.Get(t => t.FollowUpId == id);
        }

        // GET api/<controller>/5
        public IEnumerable<FollowUp> GetFollowUpsbyExpertId(int id)
        {
            return FollowUpRepository.GetAll(t => t.ExpertId == id && t.Active==true);
        }
        
        // POST api/<controller>
        public HttpResponseMessage PostFollowUp(object FollowUpobj)
        {
            //JavaScriptSerializer js = new JavaScriptSerializer();
            //var json = FollowUpobj;
            //FollowUp FollowUp = js.Deserialize<FollowUp>(json.ToString());
            //FollowUp.Active = true;
            //FollowUp.CreatedOn = DateTime.Now;
            //if (ModelState.IsValid)
            //{
            //    FollowUpRepository.Add(FollowUp);
            //    unitOfWork.SaveChanges();
            //    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, FollowUp);
            //    response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = FollowUp.FollowUpId }));
            //    return response;
            //}
            //else
            //{
            //    var errors = ModelState.Values.SelectMany(v => v.Errors);
            //    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            //}
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

        // PUT api/<controller>
        //public HttpResponseMessage UpdateUser(int id, User user)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
        //    }

        //    if (id != user.UserId)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.BadRequest);
        //    }
        //    UserRepository.Attach(user);
        //    try
        //    {
        //        unitOfWork.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException ex)
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
        //    }

        //    return Request.CreateResponse(HttpStatusCode.OK);
        //}
 
        // DELETE api/<controller>/5
        public HttpResponseMessage DeleteFollowUp(int id)
        {
            //FollowUp FollowUp = FollowUpRepository.Get(t => t.FollowUpId == id);
            //if (FollowUp == null)
            //{
            //    return Request.CreateResponse(HttpStatusCode.NotFound);
            //}

            //FollowUpRepository.Delete(FollowUp);

            //try
            //{
            //    unitOfWork.SaveChanges();
            //}
            //catch (DbUpdateConcurrencyException ex)
            //{
            //    return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            //}
            //return Request.CreateResponse(HttpStatusCode.OK, FollowUp);
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }
        
    }
}