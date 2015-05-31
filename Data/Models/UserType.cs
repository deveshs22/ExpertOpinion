using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class UserType
    {
        public UserType()
        {
            this.Users = new List<User>();
        }

        public int UserTypeId { get; set; }
        public string Description { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
