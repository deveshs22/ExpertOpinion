using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Payment
    {
        public int PaymentId { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public Nullable<System.DateTime> PmtDate { get; set; }
        public Nullable<int> UserId { get; set; }
        public string TransactionId { get; set; }
        public string Invoice { get; set; }
        public Nullable<int> QuestionId { get; set; }
    }
}
