using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Speciality
    {
        public Speciality()
        {
            this.ExpertDetails = new List<ExpertDetail>();
        }

        public int SpecialityId { get; set; }
        public string Speciality1 { get; set; }
        public string SpecialityText { get; set; }
        public ICollection<ExpertDetail> ExpertDetails { get; set; }
    }
}
