using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class OfferType
    {
        public OfferType()
        {
            this.Offers = new List<Offer>();
        }

        public int OfferTypeId { get; set; }
        public string OfferTypeDesc { get; set; }

        public ICollection<Offer> Offers { get; set; }
    }
}
