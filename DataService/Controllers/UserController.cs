using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;

using Data.Models;
using DataService.Repository;

namespace DataService.Controllers
{
    [RoutePrefix("api/users")]
    public class UserController : ApiController
    {
        UnitOfWork unitOfWork;
        protected IRepository<User> UserRepository { get; set; }

        protected string[] Includes { get; set; }
 
        public UserController()
        {
            unitOfWork = new UnitOfWork();
            this.UserRepository = unitOfWork.Repository<User>();
        }
 
        // GET api/<controller>
        [HttpGet]
        [Route("")]
        public IEnumerable<User> GetUsers()
        {
            return UserRepository.GetAll();
        }

        // GET api/<controller>
        [HttpGet]
        [Route("expert")]
        public IEnumerable<User> GetExperts()
        {
            return UserRepository.GetWithInclude(t => t.ExpertDetails).Where(u=>u.UserTypeId == Constants.UserTypeExpert);
        }
 
        // GET api/<controller>/5
        [HttpGet]
        [Route("{id:int}")]
        public User Get(int id)
        {
            return UserRepository.Get(t => t.UserId == id);
        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("login/{id}")]
        public User GetUserLogin(string id)
        {
            return UserRepository.Get(t => t.Email == id.Split(',')[1] && t.Pwd==id.Split(',')[0]);
        }

        [HttpGet]
        [Route("login/email/{id}")]
        public User GetUserLoginbyEmail(string id)
        {
            User user = UserRepository.Get(t => t.Email == id);
            if (user!=null)
            {
                user.Active = true;
                if (ModelState.IsValid)
                {
                    UserRepository.Attach(user);
                    unitOfWork.SaveChanges();
                }
            }
            return user;

        }

        [HttpGet]
        [Route("login/uid/{id}")]
        public User GetUserLoginbyUID(string id)
        {
            return UserRepository.Get(t => t.UserUniqueId == id);
        }

        [HttpGet]
        [Route("uname/uid/{id}")]
        public string GetUserNamebyUID(string id)
        {
            User user = UserRepository.Get(t => t.UserUniqueId == id);
            if (user!=null)
            {
                return user.Name;
            }
            return null;
        }

        [HttpGet]
        [Route("uname/id/{id}")]
        public string GetUserNamebyID(int id)
        {
            User user = UserRepository.Get(t => t.UserId == id);
            if (user != null)
            {
                return user.Name;
            }
            return null;
        }
 
        // POST api/<controller>
        [HttpPost]
        public HttpResponseMessage PostUser(object userobj)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var json = userobj;
            User user = js.Deserialize<User>(json.ToString());
            user.Active = false;
            user.CreatedOn = DateTime.Now;

            if (UserRepository.Get(t => t.Email == user.Email) != null)
            {
                user = null;
                return Request.CreateResponse(HttpStatusCode.Created, user);
            }

            if (ModelState.IsValid)
            {
                UserRepository.Add(user);
                unitOfWork.SaveChanges();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, user);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = user.UserId }));

                StringBuilder sb = new StringBuilder();
                sb.Append("<html><body>");
                sb.Append("<div><center><b>Verification Mail from Expert Opinion</b></center></div><br />");
                sb.Append("<p>Dear " + user.Name+ "</p>");
                sb.Append("<p>Welcome to Expert Opinion!</p> <p>In order to get started, you need to click on the link below to verify your account.</p>");
                sb.Append("<p><a href='http://localhost:5888/?email=" + user.Email + "/'>" + user.Email + "</a></p>");
                sb.Append("<br/><p>Yours,</p><p>The Expert Opinion Team</p></div>");
                sb.Append("</body></html>");
                Common.SendMail(user.Email, sb.ToString(), "Please confirm your e-mail address - Expert Opinion");
                return response;
            }
            else
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }
 
        // PUT api/<controller>
        [HttpPut()]
        [Route("{id:int}")]
        public HttpResponseMessage PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != user.UserId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            UserRepository.Attach(user);
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
        public HttpResponseMessage DeleteUser(int id)
        {
            User user = UserRepository.Get(t => t.UserId == id);
            if (user == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            UserRepository.Delete(user);

            try
            {
                unitOfWork.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, user);
        }
        
    }
}