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
        public IEnumerable<State> GetStates()
        {
            return StateRepository.GetAll();
        }

        // GET api/<controller>/5
        public State Get(int id)
        {
            return StateRepository.Get(t => t.StateId == id);
        }

        public IEnumerable<State> GetStatesbyCountry(int id)
        {
            return StateRepository.GetAll(t => t.CountryId == id);
        }
    }
}