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

        public DbSet<City> Cities { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<ExpertDetail> ExpertDetails { get; set; }
        public DbSet<FollowUp> FollowUps { get; set; }
        public DbSet<Hospital> Hospitals { get; set; }
        public DbSet<HospitalSpeciality> HospitalSpecialities { get; set; }
        public DbSet<HospitalSpecialityDetail> HospitalSpecialityDetails { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<PriceCategory> PriceCategories { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Speciality> Specialities { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserType> UserTypes { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<OfferType> OfferType { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new CityMap());
            modelBuilder.Configurations.Add(new CountryMap());
            modelBuilder.Configurations.Add(new ExpertDetailMap());
            modelBuilder.Configurations.Add(new FollowUpMap());
            modelBuilder.Configurations.Add(new HospitalMap());
            modelBuilder.Configurations.Add(new HospitalSpecialityMap());
            modelBuilder.Configurations.Add(new HospitalSpecialityDetailMap());
            modelBuilder.Configurations.Add(new OfferMap());
            modelBuilder.Configurations.Add(new OfferTypeMap());
            modelBuilder.Configurations.Add(new PaymentMap());
            modelBuilder.Configurations.Add(new PriceCategoryMap());
            modelBuilder.Configurations.Add(new QuestionMap());
            modelBuilder.Configurations.Add(new SpecialityMap());
            modelBuilder.Configurations.Add(new StateMap());
            modelBuilder.Configurations.Add(new UserMap());
            modelBuilder.Configurations.Add(new UserTypeMap());
        }
    }
}
