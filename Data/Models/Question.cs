using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Question
    {
        public Question()
        {
            this.FollowUps = new List<FollowUp>();
        }

        public Nullable<int> QuestionId { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public Nullable<decimal> PatientAge { get; set; }
        public string PatientGender { get; set; }
        public Nullable<bool> VisitedDoctor { get; set; }
        public string Remarks { get; set; }
        public string Attach1 { get; set; }
        public string Attach2 { get; set; }
        public string Attach3 { get; set; }
        public Nullable<bool> Active { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public Nullable<bool> PaymentMade { get; set; }
        public Nullable<int> ExpertId { get; set; }
        public string ExpertReply { get; set; }
        public Nullable<System.DateTime> RepliedOn { get; set; }
        public Nullable<System.DateTime> LastModifiedOn { get; set; }
        public Nullable<int> LastModifiedBy { get; set; }
        public virtual ICollection<FollowUp> FollowUps { get; set; }
        public virtual User User { get; set; }
        public virtual User User1 { get; set; }
    }
}
