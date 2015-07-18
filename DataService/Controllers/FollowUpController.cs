using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Linq;
using Data.Models;
using DataService.Repository;
using System.Web.Script.Serialization;
using System;
using System.Data.Entity.Infrastructure;

namespace DataService.Controllers
{
    [RoutePrefix("api/followups")]
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
        [HttpGet]
        [Route("")]
        public IEnumerable<FollowUp> GetFollowUps()
        {
            return FollowUpRepository.GetAll();
        }
 
        // GET api/<controller>/5
        [HttpGet]
        [Route("{id:int}")]
        public FollowUp Get(int id)
        {
            return FollowUpRepository.Get(t => t.FollowUpId == id);
        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("byexpert/{id:int}")]
        public IEnumerable<FollowUp> GetFollowUpsbyExpertId(int id)
        {
            return FollowUpRepository.GetAll(t => t.ExpertId == id && t.Active==true && t.ExpertReply==null);
        }

        [HttpGet]
        [Route("byquestion/{id:int}")]
        public IEnumerable<FollowUp> GetFollowUpsbyQuestionId(int id)
        {
            return FollowUpRepository.GetAll(t => t.QuestionId == id);
        }

        // POST api/<controller>
        [HttpPost]
        [Route("")]
        public HttpResponseMessage PostFollowUp(object FollowUpobj)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var json = FollowUpobj;
            FollowUp FollowUp = js.Deserialize<FollowUp>(json.ToString());
            FollowUp.Active = true;
            FollowUp.CreatedOn = DateTime.Now;
            FollowUp.LastModifiedOn = DateTime.Now;
            if (ModelState.IsValid)
            {
                FollowUpRepository.Add(FollowUp);
                unitOfWork.SaveChanges();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, FollowUp);
                return response;
            }
            else
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

        //PUT api/<controller>
        [HttpPut()]
        [Route("{id:int}")]
        public HttpResponseMessage UpdateFollowUp(int id, FollowUp followup)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != followup.FollowUpId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            followup.LastModifiedOn = DateTime.Now;
            followup.RepliedOn = DateTime.Now;
            FollowUpRepository.Attach(followup);

            try
            {
                unitOfWork.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

 
        // DELETE api/<controller>/5
        [HttpDelete]
        [Route("{id:int}")]
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