using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class State
    {
        public State()
        {
            this.ExpertDetails = new List<ExpertDetail>();
            this.ExpertDetails1 = new List<ExpertDetail>();
        }

        public int StateId { get; set; }
        public string StateName { get; set; }
        public int CountryId { get; set; }
        public virtual Country Country { get; set; }
        public virtual ICollection<ExpertDetail> ExpertDetails { get; set; }
        public virtual ICollection<ExpertDetail> ExpertDetails1 { get; set; }
    }
}
