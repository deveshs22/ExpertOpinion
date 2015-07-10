using Data.Models;
using DataService.Repository;
using System.Collections;
using System.Collections.Generic;
using System.Web.Http;
using System.Linq;
using System.Net.Http;
using System.Net;
using System;
using System.Data.Entity.Infrastructure;
using System.Web.Script.Serialization;
using System.Text;
using System.Security;
using System.IO;
using System.Web;

namespace DataService.Controllers
{
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
        public IEnumerable<Speciality> GetSpecialitys()
        {
            return SpecialityRepository.GetAll();
        }

        // GET api/<controller>/5
        public Speciality Get(int id)
        {
            return SpecialityRepository.Get(t => t.SpecialityId == id);
        }
    }
}