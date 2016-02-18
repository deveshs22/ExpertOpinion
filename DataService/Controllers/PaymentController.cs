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
    [RoutePrefix("api/payment")]
    public class PaymentController : ApiController
    {
        UnitOfWork unitOfWork;
        protected IRepository<Payment> PaymentRepository { get; set; }

        protected string[] Includes { get; set; }
 
        public PaymentController()
        {
            unitOfWork = new UnitOfWork();
            this.PaymentRepository = unitOfWork.Repository<Payment>();
        }
 
        // GET api/<controller>
        [HttpGet]
        [Route("")]
        public IEnumerable<Payment> GetPayments()
        {
            return PaymentRepository.GetAll();
        }
 
        // GET api/<controller>/5
        [HttpGet]
        [Route("{id:int}")]
        public Payment Get(int id)
        {
            return PaymentRepository.Get(t => t.PaymentId == id);
        }


        // GET api/<controller>/5
        [HttpGet]
        [Route("byuser/{id:int}")]
        public IEnumerable<Payment> GetPaymentsbyUserId(int id)
        {
            return PaymentRepository.GetAll(t => t.UserId == id);
        }
        
        // POST api/<controller>
        [HttpPost]
        [Route("")]
        public HttpResponseMessage PostPayment(object Paymentobj)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var json = Paymentobj;
            Payment Payment = js.Deserialize<Payment>(json.ToString());
            Payment.PmtDate = DateTime.Now;

            if (ModelState.IsValid)
            {
                PaymentRepository.Add(Payment);
                unitOfWork.SaveChanges();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, Payment);
                response.Content = new StringContent(Payment.PaymentId.ToString());
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
        public HttpResponseMessage UpdatePayment(int id, object Paymentobj)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var json = Paymentobj;
            Payment PaymentUpdate = js.Deserialize<Payment>(json.ToString());

            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            //if (id != Payment.PaymentId)
            //{
            //    return Request.CreateResponse(HttpStatusCode.BadRequest);
            //}

            Payment Payment = Get(id);

            Payment.TransactionId = PaymentUpdate.TransactionId;
            Payment.Invoice = PaymentUpdate.Invoice;
            PaymentRepository.Attach(Payment);

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
        public HttpResponseMessage DeletePayment(int id)
        {
            Payment Payment = PaymentRepository.Get(t => t.PaymentId == id);
            if (Payment == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            PaymentRepository.Delete(Payment);

            try
            {
                unitOfWork.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
            return Request.CreateResponse(HttpStatusCode.OK, Payment);
        }
        
    }
}