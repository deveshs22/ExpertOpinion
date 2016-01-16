using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Offer
    {
        public int OfferId { get; set; }
        public string OfferCode { get; set; }
        public string OfferDescription { get; set; }
        public Nullable<System.DateTime> ValidFrom { get; set; }
        public Nullable<System.DateTime> ValidTo { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<int> OfferTypeId { get; set; }
        public Nullable<int> OfferValue { get; set; }
        public Nullable<int> UserId { get; set; }
        public Nullable<int> MaxUseTime { get; set; }
        public User User { get; set; }
        public OfferType OfferType { get; set; }
    }
}
