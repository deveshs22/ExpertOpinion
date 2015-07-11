using System.Collections.Generic;
using System.Web.Http;

using Data.Models;
using DataService.Repository;

namespace DataService.Controllers
{
    [RoutePrefix("api/cities")]
    public class CityController : ApiController
    {
        UnitOfWork unitOfWork;
        protected IRepository<City> CityRepository { get; set; }

        protected string[] Includes { get; set; }

        public CityController()
        {
            unitOfWork = new UnitOfWork();
            this.CityRepository = unitOfWork.Repository<City>();
        }

        // GET api/<controller>
        [HttpGet]
        [Route("")]
        public IEnumerable<City> GetCitys()
        {
            return CityRepository.GetAll();
        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("{id:int}")]
        public City Get(int id)
        {
            return CityRepository.Get(t => t.CityId == id);
        }

        [HttpGet]
        [Route("bystate/{id:int}")]
        public IEnumerable<City> GetCitiesbyState(int id)
        {
            return CityRepository.GetAll(t => t.StateId == id);
        }
    }
}