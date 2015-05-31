using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class ExpertDetail
    {
        public int ExpertDetailId { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
