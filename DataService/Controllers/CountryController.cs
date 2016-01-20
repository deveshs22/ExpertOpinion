using System.Collections.Generic;
using System.Web.Http;

using Data.Models;
using DataService.Repository;

namespace DataService.Controllers
{
    [RoutePrefix("api/countries")]
    public class CountryController : ApiController
    {
        UnitOfWork unitOfWork;
        protected IRepository<Country> CountryRepository { get; set; }

        protected string[] Includes { get; set; }

        public CountryController()
        {
            unitOfWork = new UnitOfWork();
            this.CountryRepository = unitOfWork.Repository<Country>();
        }

        // GET api/<controller>
        [HttpGet]
        [Route("")]
        public IEnumerable<Country> GetCountrys()
        {
            return CountryRepository.GetAll();
        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("{id:int}")]
        public Country Get(int id)
        {
            return CountryRepository.Get(t => t.CountryId == id);
        }
    }
}