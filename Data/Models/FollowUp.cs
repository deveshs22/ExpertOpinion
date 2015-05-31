using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class FollowUp
    {
        public int FollowUpId { get; set; }
        public int QuestionId { get; set; }
        public string FollowUpQuestion { get; set; }
        public int FolllowUpIndex { get; set; }
        public int UserId { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public string ExpertReply { get; set; }
        public Nullable<int> ExpertId { get; set; }
        public Nullable<System.DateTime> RepliedOn { get; set; }
        public Nullable<bool> Active { get; set; }
        public Nullable<System.DateTime> LastModifiedOn { get; set; }
        public Nullable<int> LastModifiedBy { get; set; }
        public virtual Question Question { get; set; }
        public virtual User User { get; set; }
        public virtual User User1 { get; set; }
    }
}
