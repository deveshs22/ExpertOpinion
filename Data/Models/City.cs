using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class City
    {
        public City()
        {
            this.ExpertDetails = new List<ExpertDetail>();
        }

        public int CityId { get; set; }
        public string CityName { get; set; }
        public int StateId { get; set; }
        public ICollection<ExpertDetail> ExpertDetails { get; set; }
    }
}
