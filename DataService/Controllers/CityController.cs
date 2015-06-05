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
        public IEnumerable<City> GetCitys()
        {
            return CityRepository.GetAll();
        }

        // GET api/<controller>/5
        public City Get(int id)
        {
            return CityRepository.Get(t => t.CityId == id);
        }

        public IEnumerable<City> GetCitiesbyState(int id)
        {
            return CityRepository.GetAll(t => t.StateId == id);
        }
    }
}