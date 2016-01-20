using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class HospitalSpecialityDetail
    {
        public int HospitalSpecialityDetailId { get; set; }
        public int HospitalId { get; set; }
        public int HospitalSpecialityId { get; set; }
        public Hospital Hospital { get; set; }
        public virtual HospitalSpeciality HospitalSpeciality { get; set; }
    }
}
