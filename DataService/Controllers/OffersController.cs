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
    [RoutePrefix("api/offers")]
    public class OffersController : ApiController
    {
        UnitOfWork unitOfWork;
        protected IRepository<Offer> OffersRepository { get; set; }

        protected string[] Includes { get; set; }

        public OffersController()
        {
            unitOfWork = new UnitOfWork();
            this.OffersRepository = unitOfWork.Repository<Offer>();
        }
 
        // GET api/<controller>
        [HttpGet]
        [Route("")]
        public IEnumerable<Offer> GetOffers()
        {
            return OffersRepository.GetAll();    
        }
 
        // GET api/<controller>/5
        [HttpGet]
        [Route("{id:int}")]
        public Offer Get(int id)
        {
            return OffersRepository.Get(t => t.OfferId == id);
        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("getbycodecode/{id}")]
        public object GetOfferByCode(string id)
        {
            var offer = OffersRepository.GetWithInclude(u => u.OfferCode == id, t => t.OfferType);
            return new { offer.OfferType.OfferTypeDesc, offer.OfferDescription, offer.IsActive, offer.MaxUseTime, offer.OfferValue, offer.ValidFrom, offer.ValidTo };
        }
    }
}