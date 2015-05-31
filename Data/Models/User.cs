using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class User
    {
        public User()
        {
            this.ExpertDetails = new List<ExpertDetail>();
            this.FollowUps = new List<FollowUp>();
            this.FollowUps1 = new List<FollowUp>();
            this.Questions = new List<Question>();
            this.Questions1 = new List<Question>();
        }

        public Nullable<int> UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Pwd { get; set; }
        public Nullable<bool> Active { get; set; }
        public Nullable<System.DateTime> CreatedOn { get; set; }
        public Nullable<System.DateTime> LastLogin { get; set; }
        public int UserTypeId { get; set; }
        public string UserUniqueId { get; set; }
        public virtual ICollection<ExpertDetail> ExpertDetails { get; set; }
        public virtual ICollection<FollowUp> FollowUps { get; set; }
        public virtual ICollection<FollowUp> FollowUps1 { get; set; }
        public virtual ICollection<Question> Questions { get; set; }
        public virtual ICollection<Question> Questions1 { get; set; }
        public UserType UserType { get; set; }
    }
}
