using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class PriceCategory
    {
        public int PriceCategoryId { get; set; }
        public string Description { get; set; }
        public Nullable<int> Price { get; set; }
    }
}
