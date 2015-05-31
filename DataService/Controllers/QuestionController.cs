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
    public class QuestionController : ApiController
    {
        UnitOfWork unitOfWork;
        protected IRepository<Question> QuestionRepository { get; set; }

        protected string[] Includes { get; set; }
 
        public QuestionController()
        {
            unitOfWork = new UnitOfWork();
            this.QuestionRepository = unitOfWork.Repository<Question>();
        }
 
        // GET api/<controller>
        public IEnumerable<Question> GetQuestions()
        {
            return QuestionRepository.GetAll();
        }
 
        // GET api/<controller>/5
        public Question Get(int id)
        {
            return QuestionRepository.Get(t => t.QuestionId == id);
        }

        
        // POST api/<controller>
        public HttpResponseMessage PostQuestion(object questionobj)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var json = questionobj;
            Question question = js.Deserialize<Question>(json.ToString());
            question.Active = true;
            question.CreatedOn = DateTime.Now;
            if (ModelState.IsValid)
            {
                QuestionRepository.Add(question);
                unitOfWork.SaveChanges();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, question);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = question.QuestionId }));
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
        public HttpResponseMessage DeleteQuestion(int id)
        {
            Question question = QuestionRepository.Get(t => t.QuestionId == id);
            if (question == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            QuestionRepository.Delete(question);

            try
            {
                unitOfWork.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
            return Request.CreateResponse(HttpStatusCode.OK, question);
        }
        
    }
}