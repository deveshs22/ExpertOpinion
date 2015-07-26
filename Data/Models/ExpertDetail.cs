using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class ExpertDetail
    {
        public int ExpertDetailId { get; set; }
        public int UserId { get; set; }
        public Nullable<System.DateTime> DOB { get; set; }
        public string Gender { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Address { get; set; }
        public Nullable<int> CountryId { get; set; }
        public Nullable<int> StateId { get; set; }
        public Nullable<int> CityId { get; set; }
        public string Photo { get; set; }
        public Nullable<int> SpecialityId { get; set; }
        public string LicenceNo { get; set; }
        public string Issuer { get; set; }
        public Nullable<int> IssuerCountryId { get; set; }
        public Nullable<int> IssuerStateId { get; set; }
        public string IssuerContact { get; set; }
        public string Resume { get; set; }
        public string Certificate1 { get; set; }
        public string Certificate2 { get; set; }
        public string Certificate3 { get; set; }
        public City City { get; set; }
        public Country Country { get; set; }
        public Country Country1 { get; set; }
        public State State { get; set; }
        public State State1 { get; set; }
        public User User { get; set; }
        public virtual Speciality Speciality { get; set; }
    }
}
