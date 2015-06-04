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

namespace DataService.Controllers
{
    public class ExpertDetailController : ApiController
    {
        UnitOfWork unitOfWork;
        protected IRepository<ExpertDetail> ExpertDetailRepository { get; set; }

        protected string[] Includes { get; set; }
 
        public ExpertDetailController()
        {
            unitOfWork = new UnitOfWork();
            this.ExpertDetailRepository = unitOfWork.Repository<ExpertDetail>();
        }
 
        // GET api/<controller>
        public IEnumerable<ExpertDetail> GetExpertDetails()
        {
            return ExpertDetailRepository.GetAll();
        }
 
        // GET api/<controller>/5
        public ExpertDetail Get(int id)
        {
            return ExpertDetailRepository.Get(t => t.ExpertDetailId == id);
        }
    
        // POST api/<controller>
        public HttpResponseMessage PostExpertDetail(object ExpertDetailobj)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var json = ExpertDetailobj;
            ExpertDetail expertDetail = js.Deserialize<ExpertDetail>(json.ToString());


            if (ModelState.IsValid)
            {
                ExpertDetailRepository.Add(expertDetail);
                unitOfWork.SaveChanges();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, expertDetail);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = expertDetail.ExpertDetailId }));
                return response;
            }
            else
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
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
        public HttpResponseMessage DeleteUser(int id)
        {
            ExpertDetail expertDetail = ExpertDetailRepository.Get(t => t.ExpertDetailId == id);
            if (expertDetail == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            ExpertDetailRepository.Delete(expertDetail);

            try
            {
                unitOfWork.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, expertDetail);
        }
        
    }
}