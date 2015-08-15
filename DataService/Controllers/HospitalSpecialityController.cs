using System.Collections.Generic;
using System.Web.Http;

using Data.Models;
using DataService.Repository;

namespace DataService.Controllers
{
    [RoutePrefix("api/hospitalspecialities")]
    public class HospitalSpecialityController : ApiController
    {
        UnitOfWork unitOfWork;
        protected IRepository<HospitalSpeciality> HospitalSpecialityRepository { get; set; }

        protected string[] Includes { get; set; }

        public HospitalSpecialityController()
        {
            unitOfWork = new UnitOfWork();
            this.HospitalSpecialityRepository = unitOfWork.Repository<HospitalSpeciality>();
        }

        // GET api/<controller>
        [HttpGet]
        [Route("")]
        public IEnumerable<HospitalSpeciality> GetSpecialitys()
        {
            return HospitalSpecialityRepository.GetAll();
        }

        // GET api/<controller>/5
        [HttpGet]
        [Route("{id:int}")]
        public HospitalSpeciality Get(int id)
        {
            return HospitalSpecialityRepository.Get(t => t.HospitalSpecialityId == id);
        }
    }
}