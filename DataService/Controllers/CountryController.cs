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
        public IEnumerable<Country> GetCountrys()
        {
            return CountryRepository.GetAll();
        }

        // GET api/<controller>/5
        public Country Get(int id)
        {
            return CountryRepository.Get(t => t.CountryId == id);
        }
    }
}