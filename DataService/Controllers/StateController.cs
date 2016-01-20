using System.Collections.Generic;
using System.Web.Http;

using Data.Models;
using DataService.Repository;

namespace DataService.Controllers
{
    [RoutePrefix("api/states")]
    public class StateController : ApiController
    {
        UnitOfWork unitOfWork;
        protected IRepository<State> StateRepository { get; set; }

        protected string[] Includes { get; set; }

        public StateController()
        {
            unitOfWork = new UnitOfWork();
            this.StateRepository = unitOfWork.Repository<State>();
        }

        // GET api/<controller>
        [HttpGet]
        [Route("")]
        public IEnumerable<State> GetStates()
        {
            return StateRepository.GetAll();
        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("{id:int}")]
        public State Get(int id)
        {
            return StateRepository.Get(t => t.StateId == id);
        }

        [HttpGet]
        [Route("bycountry/{id:int}")]
        public IEnumerable<State> GetStatesbyCountry(int id)
        {
            return StateRepository.GetAll(t => t.CountryId == id);
        }
    }
}