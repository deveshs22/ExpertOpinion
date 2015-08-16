using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Hospital
    {
        public Hospital()
        {
            this.HospitalSpecialityDetails = new List<HospitalSpecialityDetail>();
        }

        public Nullable<int> HospitalId { get; set; }
        public string HospitalName { get; set; }
        public string Description { get; set; }
        public string Photo { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public Nullable<int> CityId { get; set; }
        public Nullable<int> StateId { get; set; }
        public Nullable<int> CountryId { get; set; }
        public City City { get; set; }
        public Country Country { get; set; }
        public State State { get; set; }
        public ICollection<HospitalSpecialityDetail> HospitalSpecialityDetails { get; set; }
    }
}
