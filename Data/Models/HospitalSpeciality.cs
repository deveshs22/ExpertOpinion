using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class HospitalSpeciality
    {
        public HospitalSpeciality()
        {
            this.HospitalSpecialityDetails = new List<HospitalSpecialityDetail>();
        }

        public int HospitalSpecialityId { get; set; }
        public string HospitalSpeciality1 { get; set; }
        public  ICollection<HospitalSpecialityDetail> HospitalSpecialityDetails { get; set; }
    }
}
