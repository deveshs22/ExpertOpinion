using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using Data.Models.Mapping;

namespace Data.Models
{
    public partial class ExpertOpinionDBContext : DbContext
    {
        static ExpertOpinionDBContext()
        {
            Database.SetInitializer<ExpertOpinionDBContext>(null);
        }

        public ExpertOpinionDBContext()
            : base("Name=ExpertOpinionDBContext")
        {
        }

        public DbSet<ExpertDetail> ExpertDetails { get; set; }
        public DbSet<FollowUp> FollowUps { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserType> UserTypes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new ExpertDetailMap());
            modelBuilder.Configurations.Add(new FollowUpMap());
            modelBuilder.Configurations.Add(new PaymentMap());
            modelBuilder.Configurations.Add(new QuestionMap());
            modelBuilder.Configurations.Add(new UserMap());
            modelBuilder.Configurations.Add(new UserTypeMap());
        }
    }
}
