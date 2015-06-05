using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Country
    {
        public Country()
        {
            this.ExpertDetails = new List<ExpertDetail>();
            this.ExpertDetails1 = new List<ExpertDetail>();
            this.States = new List<State>();
        }

        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public ICollection<ExpertDetail> ExpertDetails { get; set; }
        public ICollection<ExpertDetail> ExpertDetails1 { get; set; }
        public ICollection<State> States { get; set; }
    }
}
