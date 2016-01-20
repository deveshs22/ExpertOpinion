using System.Collections.Generic;
using System.Web.Http;

using Data.Models;
using DataService.Repository;

namespace DataService.Controllers
{
    [RoutePrefix("api/specialities")]
    public class SpecialityController : ApiController
    {
        UnitOfWork unitOfWork;
        protected IRepository<Speciality> SpecialityRepository { get; set; }

        protected string[] Includes { get; set; }

        public SpecialityController()
        {
            unitOfWork = new UnitOfWork();
            this.SpecialityRepository = unitOfWork.Repository<Speciality>();
        }

        // GET api/<controller>
        [HttpGet]
        [Route("")]
        public IEnumerable<Speciality> GetSpecialitys()
        {
            return SpecialityRepository.GetAll();
        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("{id:int}")]
        public Speciality Get(int id)
        {
            return SpecialityRepository.Get(t => t.SpecialityId == id);
        }
    }
}