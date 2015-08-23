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
    [RoutePrefix("api/hospitals")]
    public class HospitalsController : ApiController
    {
        UnitOfWork unitOfWork;
        protected IRepository<Hospital> HospitalsRepository { get; set; }

        protected string[] Includes { get; set; }

        public HospitalsController()
        {
            unitOfWork = new UnitOfWork();
            this.HospitalsRepository = unitOfWork.Repository<Hospital>();
        }
 
        // GET api/<controller>
        [HttpGet]
        [Route("")]
        public IEnumerable<Hospital> GetHospitals()
        {
            return HospitalsRepository.GetAll();    
        }
 
        // GET api/<controller>/5
        [HttpGet]
        [Route("{id:int}")]
        public Hospital Get(int id)
        {
            return HospitalsRepository.Get(t => t.HospitalId == id);
        }
    
        // POST api/<controller>
        [HttpPost]
        [Route("")]
        public HttpResponseMessage PostHospitalDetail(object HospitalDetailobj)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var json = HospitalDetailobj;
            Hospital hospital = js.Deserialize<Hospital>(json.ToString());


            if (ModelState.IsValid)
            {
                HospitalsRepository.Add(hospital);
                unitOfWork.SaveChanges();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, hospital);
                response.Content = new StringContent(hospital.HospitalId.ToString());
                return response;
            }
            else
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }
 
        [HttpPut]
        [Route("{id:int}")]
       //  PUT api/<controller>
        public HttpResponseMessage UpdateHospital(int id, Hospital hospital)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != hospital.HospitalId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            HospitalsRepository.Attach(hospital);
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
        public HttpResponseMessage Delete(int id)
        {
            Hospital hospital = HospitalsRepository.Get(t => t.HospitalId == id);
            if (hospital == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            HospitalsRepository.Delete(hospital);

            try
            {
                unitOfWork.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, hospital);
        }
        
    }
}