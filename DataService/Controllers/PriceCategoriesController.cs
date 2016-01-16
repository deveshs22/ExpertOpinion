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
    [RoutePrefix("api/pricecategories")]
    public class PriceCategoriesController : ApiController
    {
        UnitOfWork unitOfWork;
        protected IRepository<PriceCategory> PriceCategoriesRepository { get; set; }

        protected string[] Includes { get; set; }

        public PriceCategoriesController()
        {
            unitOfWork = new UnitOfWork();
            this.PriceCategoriesRepository = unitOfWork.Repository<PriceCategory>();
        }
 
        // GET api/<controller>
        [HttpGet]
        [Route("")]
        public IEnumerable<PriceCategory> GetPriceCategories()
        {
            return PriceCategoriesRepository.GetAll();    
        }
 
        // GET api/<controller>/5
        [HttpGet]
        [Route("{id:int}")]
        public PriceCategory Get(int id)
        {
            return PriceCategoriesRepository.Get(t => t.PriceCategoryId == id);
        }
    
    
     
 
    
        
    }
}