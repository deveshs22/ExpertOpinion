using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;

using Data.Models;
using DataService.Repository;

namespace DataService.Controllers
{
    [RoutePrefix("api/questions")]
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
        [HttpGet]
        [Route("")]
        public IEnumerable<Question> GetQuestions()
        {
            return QuestionRepository.GetAll();
        }
 
        // GET api/<controller>/5
        [HttpGet]
        [Route("{id:int}")]
        public Question Get(int id)
        {
            return QuestionRepository.Get(t => t.QuestionId == id);
        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("byexpert/{id:int}")]
        public IEnumerable<Question> GetQuestionsbyExpertId(int id)
        {
            return QuestionRepository.GetAll(t => t.ExpertId == id && t.Active == true && t.ExpertReply == null);
        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("historybyexpert/{id:int}")]
        public IEnumerable<Question> GetQuestionsHistorybyExpertId(int id)
        {
            return QuestionRepository.GetAll(t => t.ExpertId == id);
        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("byuser/{id:int}")]
        public IEnumerable<Question> GetQuestionsbyUserId(int id)
        {
            return QuestionRepository.GetAll(t => t.UserId == id && t.Active == true);
        }
        
        // POST api/<controller>
        [HttpPost]
        [Route("")]
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
                response.Content = new StringContent(question.QuestionId.ToString());
                return response;
            }
            else
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

         //PUT api/<controller>
        [HttpPut()]
        [Route("{id:int}")]
        public HttpResponseMessage UpdateQuestion(int id, Question question)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != question.QuestionId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            QuestionRepository.Attach(question);

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